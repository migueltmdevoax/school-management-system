import db from "../../config/db.js";

// crear adeudo
export async function createPayment({ studentId, amount, dueDate }) {
  const result = await db.query(
    `
    INSERT INTO payments (student_id, amount, due_date, status)
    VALUES ($1, $2, $3, 'PENDING')
    RETURNING *
    `,
    [studentId, amount, dueDate]
  );

  return result.rows[0];
}

// obtener pagos por alumno
export async function getPaymentsByStudent(studentId) {
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

// marcar como pagado
export async function markAsPaid(paymentId) {
  const result = await db.query(
    `
    UPDATE payments
    SET status = 'PAID',
        paid_at = now(),
        updated_at = now()
    WHERE id = $1
    RETURNING *
    `,
    [paymentId]
  );

  return result.rows[0];
}