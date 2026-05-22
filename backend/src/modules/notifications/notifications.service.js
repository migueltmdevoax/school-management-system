import db from "../../config/db.js";

export async function createNotification({ userId, title, message }) {
  await db.query(
    `
    INSERT INTO notifications (user_id, title, message)
    VALUES ($1, $2, $3)
    `,
    [userId, title, message]
  );
}

export async function notifyParentsOfPayment(studentId, amount) {
  const result = await db.query(
    `
    SELECT u.id as user_id
    FROM parent_students ps
    JOIN parents p ON ps.parent_id = p.id
    JOIN users u ON p.user_id = u.id
    WHERE ps.student_id = $1
    `,
    [studentId]
  );

  for (const row of result.rows) {
    await createNotification({
      userId: row.user_id,
      title: "Pago pendiente",
      message: `Tienes un adeudo de $${amount}`
    });
  }
}

export async function notifyParentsOfIncident(studentId, title) {
  const result = await db.query(
    `
    SELECT u.id as user_id
    FROM parent_students ps
    JOIN parents p ON ps.parent_id = p.id
    JOIN users u ON p.user_id = u.id
    WHERE ps.student_id = $1
    `,
    [studentId]
  );

  for (const row of result.rows) {
    await createNotification({
      userId: row.user_id,
      title: "Nuevo incidente",
      message: `Se ha reportado: ${title}`
    });
  }
}