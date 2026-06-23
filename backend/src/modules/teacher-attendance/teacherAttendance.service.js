import db from "../../config/db.js";

export const markTeacherAttendance = async ({ teacherId, status, date }) => {
  const { rows } = await db.query(
    `
    INSERT INTO teacher_attendance (teacher_id, status, attendance_date)
    VALUES ($1, $2, $3)
    ON CONFLICT (teacher_id, attendance_date)
    DO UPDATE SET status = EXCLUDED.status
    RETURNING *
    `,
    [teacherId, status, date]
  );
  return rows[0];
};

export const getTeacherAttendance = async (teacherId) => {
  const { rows } = await db.query(
    `SELECT * FROM teacher_attendance
     WHERE teacher_id = $1
     ORDER BY attendance_date DESC`,
    [teacherId]
  );
  return rows;
};

export const getTodayTeacherAttendance = async () => {
  const { rows } = await db.query(
    `SELECT
       ta.*,
       t.first_name,
       t.last_name
     FROM teacher_attendance ta
     JOIN teachers t ON t.id = ta.teacher_id
     WHERE ta.attendance_date = CURRENT_DATE
     ORDER BY t.last_name ASC`
  );
  return rows;
};