import db from "../../config/db.js";

export const getParentAttendance = async (userId) => {
  const { rows: parentRows } = await db.query(
    `SELECT id FROM parents WHERE user_id = $1`,
    [userId]
  );

  if (!parentRows[0]) return [];
  const parentId = parentRows[0].id;

  const { rows } = await db.query(
    `SELECT
       a.id, a.status, a.attendance_date,
       s.first_name, s.last_name
     FROM attendance a
     JOIN students s ON s.id = a.student_id
     JOIN parent_students ps ON ps.student_id = s.id
     WHERE ps.parent_id = $1
     ORDER BY a.attendance_date DESC
     LIMIT 30`,
    [parentId]
  );

  return rows;
};