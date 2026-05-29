import db from "../../config/db.js";

import {
  createActivityLog,
} from "../activity/activity.service.js";

import {

  emitStudentMetricsUpdated,

  emitDashboardUpdated,

} from "../../realtime/emitters.js";





// 🟣 CREATE PAYMENT
export async function createPayment({

  studentId,

  amount,

  dueDate,

}) {

  const result = await db.query(

    `
    INSERT INTO payments (

      student_id,
      amount,
      due_date,
      status

    )

    VALUES (
      $1,
      $2,
      $3,
      'PENDING'
    )

    RETURNING *
    `,

    [

      studentId,

      amount,

      dueDate,

    ]

  );




  const payment =
    result.rows[0];





  /*
  |--------------------------------------------------------------------------
  | 🟣 ACTIVITY LOG
  |--------------------------------------------------------------------------
  */

  await createActivityLog({

    entityType:
      "student",

    entityId:
      studentId,

    action:
      "payment_created",

    title:
      "Payment created",

    description:
      `Pending payment of $${amount}`,

    metadata: {

      amount,

      paymentId:
        payment.id,

    },

  });





  /*
  |--------------------------------------------------------------------------
  | 🟣 REALTIME
  |--------------------------------------------------------------------------
  */

  await emitStudentMetricsUpdated(
    studentId
  );




  await emitDashboardUpdated();





  return payment;

}





// 🟣 GET PAYMENTS BY STUDENT
export async function getPaymentsByStudent(
  studentId
) {

  const result = await db.query(

    `
    SELECT *
    FROM payments

    WHERE student_id = $1

    ORDER BY created_at DESC
    `,

    [studentId]

  );




  return result.rows;

}





// 🟣 MARK PAYMENT AS PAID
export async function markAsPaid(
  paymentId
) {

  const result = await db.query(

    `
    UPDATE payments

    SET

      status = 'PAID',

      paid_at = NOW(),

      updated_at = NOW()

    WHERE id = $1

    RETURNING *
    `,

    [paymentId]

  );




  const payment =
    result.rows[0];





  /*
  |--------------------------------------------------------------------------
  | 🟣 ACTIVITY LOG
  |--------------------------------------------------------------------------
  */

  await createActivityLog({

    entityType:
      "student",

    entityId:
      payment.student_id,

    action:
      "payment_paid",

    title:
      "Payment completed",

    description:
      `Payment #${payment.id} marked as paid`,

    metadata: {

      paymentId:
        payment.id,

    },

  });





  /*
  |--------------------------------------------------------------------------
  | 🟣 REALTIME
  |--------------------------------------------------------------------------
  */

  await emitStudentMetricsUpdated(
    payment.student_id
  );




  await emitDashboardUpdated();





  return payment;

}