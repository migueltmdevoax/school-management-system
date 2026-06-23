import db from "../../config/db.js";

export const getAttendanceByTeacher = async (teacherId, date) => {
  const targetDate = date || new Date().toISOString().split("T")[0];

  const { rows } = await db.query(`
    SELECT
      s.id AS student_id,
      s.first_name,
      s.last_name,
      COALESCE(a.status, 'PENDING') AS status,
      a.id AS attendance_id,
      $2::date AS attendance_date
    FROM students s
    JOIN groups g ON g.id = s.group_id
    LEFT JOIN attendance a ON a.student_id = s.id AND a.attendance_date = $2::date
    WHERE g.teacher_id = $1
    ORDER BY s.last_name ASC
  `, [teacherId, targetDate]);

  return rows;
};

export const markAttendance = async ({ studentId, status, date, createdBy }) => {
  const targetDate = date || new Date().toISOString().split("T")[0];

  const { rows } = await db.query(`
    INSERT INTO attendance (student_id, status, attendance_date, created_by)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (student_id, attendance_date)
    DO UPDATE SET status = $2
    RETURNING *
  `, [studentId, status, targetDate, createdBy]);

  return rows[0];
};

export const getAttendanceStats = async () => {
  const { rows } = await db.query(`
    SELECT
      COALESCE(COUNT(*) FILTER (WHERE status = 'PRESENT'), 0)::int AS present,
      COALESCE(COUNT(*) FILTER (WHERE status = 'ABSENT'),  0)::int AS absent,
      COALESCE(COUNT(*) FILTER (WHERE status = 'LATE'),    0)::int AS late,
      COALESCE(COUNT(*), 0)::int AS total
    FROM attendance
  `);
  return rows[0];
};