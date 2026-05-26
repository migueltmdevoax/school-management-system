import db from "../../config/db.js";

import {

  emitNotificationCreated

} from "../../realtime/emitters.js";



// 🔥 CREATE NOTIFICATION
export async function createNotification({

  userId,
  title,
  message,
  type = null,
  relatedId = null

}) {

  const result = await db.query(
    `
    INSERT INTO notifications (

      user_id,
      title,
      message,
      type,
      related_id

    )

    VALUES ($1, $2, $3, $4, $5)

    RETURNING *
    `,
    [

      userId,
      title,
      message,
      type,
      relatedId

    ]
  );



  const notification =
    result.rows[0];



  // 🔥 REALTIME EMIT
  emitNotificationCreated(

    userId,

    notification
  );



  return notification;
}





// 🔥 NOTIFY PARENTS OF PAYMENT
export async function notifyParentsOfPayment(

  studentId,
  amount

) {

  const result = await db.query(
    `
    SELECT u.id as user_id

    FROM parent_students ps

    JOIN parents p
      ON ps.parent_id = p.id

    JOIN users u
      ON p.user_id = u.id

    WHERE ps.student_id = $1
    `,
    [studentId]
  );



  for (const row of result.rows) {

    await createNotification({

      userId: row.user_id,

      title: "Pago pendiente",

      message:
        `Tienes un adeudo de $${amount}`,

      type: "payment"
    });
  }
}





// 🔥 NOTIFY PARENTS OF INCIDENT
export async function notifyParentsOfIncident(

  studentId,
  title

) {

  const result = await db.query(
    `
    SELECT u.id as user_id

    FROM parent_students ps

    JOIN parents p
      ON ps.parent_id = p.id

    JOIN users u
      ON p.user_id = u.id

    WHERE ps.student_id = $1
    `,
    [studentId]
  );



  for (const row of result.rows) {

    await createNotification({

      userId: row.user_id,

      title: "Nuevo incidente",

      message:
        `Se ha reportado: ${title}`,

      type: "incident"
    });
  }
}





// 🔥 GET USER NOTIFICATIONS
export async function getUserNotifications(
  userId
) {

  const result = await db.query(
    `
    SELECT *

    FROM notifications

    WHERE user_id = $1

    ORDER BY created_at DESC
    `,
    [userId]
  );



  return result.rows;
}





// 🔥 MARK AS READ
export async function markAsRead(id) {

  const result = await db.query(
    `
    UPDATE notifications

    SET is_read = true

    WHERE id = $1

    RETURNING *
    `,
    [id]
  );



  return result.rows[0];
}