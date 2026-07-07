import db from "../../config/db.js";

export const getByStudent = async (studentId, date) => {
  const { rows } = await db.query(
    `SELECT pc.*, u.email AS registered_by_email
     FROM pickup_control pc
     LEFT JOIN users u ON u.id = pc.registered_by
     WHERE pc.student_id = $1
       AND DATE(pc.event_time) = $2
     ORDER BY pc.event_time ASC`,
    [studentId, date]
  );
  return rows;
};

export const getByDate = async (date, teacherId) => {
  const { rows } = await db.query(
    `SELECT pc.*, s.first_name, s.last_name
     FROM pickup_control pc
     JOIN students s ON s.id = pc.student_id
     JOIN groups g ON g.id = s.group_id
     WHERE DATE(pc.event_time) = $1 AND g.teacher_id = $2
     ORDER BY pc.event_time DESC`,
    [date, teacherId]
  );
  return rows;
};

export const create = async ({
  studentId, event_type, delivered_by,
  picked_up_by, relationship, authorized, notes, registeredBy
}) => {
  const { rows } = await db.query(
    `INSERT INTO pickup_control
       (student_id, event_type, delivered_by, picked_up_by,
        relationship, authorized, notes, registered_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
    [studentId, event_type, delivered_by || null,
     picked_up_by || null, relationship || null,
     authorized !== false, notes || null, registeredBy]
  );
  return rows[0];
};