import db from "../../config/db.js";
import { emitNotificationCreated } from "../../realtime/emitters.js";
import { sendIncidentEmail, sendPaymentEmail, sendAssignmentEmail } from "../../services/email.service.js";

export async function createNotification({ userId, title, message, type = null, relatedId = null }) {
  const result = await db.query(
    `INSERT INTO notifications (user_id, title, message, type, related_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [userId, title, message, type, relatedId]
  );
  const notification = result.rows[0];
  emitNotificationCreated(userId, notification);
  return notification;
}

async function notifyAllAdmins({ title, message, type }) {
  const { rows: admins } = await db.query(
    `SELECT id FROM users WHERE role = 'admin'`
  );
  for (const admin of admins) {
    await createNotification({ userId: admin.id, title, message, type });
  }
}

// 🔥 Helper independiente — siempre obtiene el nombre del estudiante sin importar si tiene parent
async function getStudentName(studentId) {
  const { rows } = await db.query(
    `SELECT first_name, last_name FROM students WHERE id = $1`,
    [studentId]
  );
  if (rows.length === 0) return "Unknown student";
  return `${rows[0].first_name} ${rows[0].last_name}`;
}

export async function getUserNotifications(userId) {
  const { rows } = await db.query(
    `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50`,
    [userId]
  );
  return rows;
}

export async function markAsRead(id) {
  const { rows } = await db.query(
    `UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0];
}

export async function markAllAsRead(userId) {
  await db.query(
    `UPDATE notifications SET is_read = true WHERE user_id = $1 AND is_read = false`,
    [userId]
  );
}

export async function notifyParentsOfPayment(studentId, amount) {
  // 🔥 Nombre del estudiante SIEMPRE se obtiene, sin depender de parent_students
  const studentName = await getStudentName(studentId);

  const result = await db.query(
    `SELECT
       u.id AS user_id, u.email,
       p.first_name, p.last_name,
       pay.due_date
     FROM parent_students ps
     JOIN parents  p ON ps.parent_id  = p.id
     JOIN users    u ON p.user_id     = u.id
     LEFT JOIN payments pay ON pay.student_id = ps.student_id AND pay.status = 'PENDING'
     WHERE ps.student_id = $1`,
    [studentId]
  );

  for (const row of result.rows) {
    await createNotification({
      userId:  row.user_id,
      title:   "💰 Pago pendiente",
      message: `${studentName} tiene un adeudo de $${amount}`,
      type:    "payment",
    });

    await sendPaymentEmail({
      toEmail:     row.email,
      parentName:  `${row.first_name || ""} ${row.last_name || ""}`.trim(),
      studentName,
      amount,
      dueDate:     row.due_date,
    });
  }

  // 🔥 Admin SIEMPRE recibe notificación, sin importar si hay parents o no
  await notifyAllAdmins({
    title:   "💰 Nuevo pago registrado",
    message: `Se registró un pago de $${amount} para ${studentName}`,
    type:    "payment",
  });
}

export async function notifyParentsOfIncident(studentId, title, severity = "HIGH") {
  // 🔥 Nombre del estudiante SIEMPRE se obtiene, sin depender de parent_students
  const studentName = await getStudentName(studentId);

  const result = await db.query(
    `SELECT
       u.id AS user_id, u.email,
       p.first_name, p.last_name
     FROM parent_students ps
     JOIN parents  p ON ps.parent_id  = p.id
     JOIN users    u ON p.user_id     = u.id
     WHERE ps.student_id = $1`,
    [studentId]
  );

  for (const row of result.rows) {
    await createNotification({
      userId:  row.user_id,
      title:   "🚨 Incidente registrado",
      message: `Se reportó un incidente de severidad ${severity} para ${studentName}: ${title}`,
      type:    "incident",
    });

    if (["HIGH", "MEDIUM"].includes(severity)) {
      await sendIncidentEmail({
        toEmail:       row.email,
        parentName:    `${row.first_name || ""} ${row.last_name || ""}`.trim(),
        studentName,
        incidentTitle: title,
        severity,
      });
    }
  }

  // 🔥 Admin SIEMPRE recibe notificación de TODAS las severidades (LOW, MEDIUM, HIGH)
  await notifyAllAdmins({
    title:   `🚨 Incidente ${severity} registrado`,
    message: `${studentName}: ${title}`,
    type:    "incident",
  });
}

export async function notifyParentsOfAssignment(groupId, title, dueDate = null) {
  const result = await db.query(
    `SELECT DISTINCT
       u.id AS user_id, u.email,
       p.first_name, p.last_name,
       s.first_name AS student_first, s.last_name AS student_last,
       g.name AS group_name
     FROM students s
     JOIN parent_students ps ON ps.student_id = s.id
     JOIN parents p ON p.id = ps.parent_id
     JOIN users u ON u.id = p.user_id
     LEFT JOIN groups g ON g.id = s.group_id
     WHERE s.group_id = $1`,
    [groupId]
  );

  for (const row of result.rows) {
    await createNotification({
      userId:  row.user_id,
      title:   "📚 Nueva tarea asignada",
      message: `Se publicó una nueva tarea: ${title}`,
      type:    "assignment",
    });

    await sendAssignmentEmail({
      toEmail:         row.email,
      parentName:      `${row.first_name || ""} ${row.last_name || ""}`.trim(),
      studentName:     `${row.student_first} ${row.student_last}`,
      assignmentTitle: title,
      dueDate,
      groupName:       row.group_name,
    });
  }
}