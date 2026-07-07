import db from "../../config/db.js";

export const getByStudent = async (studentId) => {
  const { rows } = await db.query(
    `SELECT dr.*, u.email AS created_by_email
     FROM daily_reports dr
     LEFT JOIN users u ON u.id = dr.created_by
     WHERE dr.student_id = $1
     ORDER BY dr.report_date DESC
     LIMIT 30`,
    [studentId]
  );
  return rows;
};

export const getByDate = async (date, teacherId) => {
  const { rows } = await db.query(
    `SELECT dr.*, s.first_name, s.last_name
     FROM daily_reports dr
     JOIN students s ON s.id = dr.student_id
     JOIN groups g ON g.id = s.group_id
     WHERE dr.report_date = $1 AND g.teacher_id = $2
     ORDER BY s.first_name ASC`,
    [date, teacherId]
  );
  return rows;
};

export const create = async ({
  studentId, report_date, created_by,
  feeding, nap, mood, evacuation, activities, notes
}) => {
  const { rows } = await db.query(
    `INSERT INTO daily_reports
       (student_id, report_date, created_by, feeding, nap, mood, evacuation, activities, notes)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     ON CONFLICT (student_id, report_date)
     DO UPDATE SET
       feeding = $4, nap = $5, mood = $6,
       evacuation = $7, activities = $8, notes = $9
     RETURNING *`,
    [studentId, report_date || new Date().toISOString().split("T")[0],
     created_by, feeding, nap, mood, evacuation, activities, notes]
  );
  return rows[0];
};

export const markParentNotified = async (id) => {
  const { rows } = await db.query(
    `UPDATE daily_reports SET parent_notified = true WHERE id = $1 RETURNING *`, [id]
  );
  return rows[0];
};