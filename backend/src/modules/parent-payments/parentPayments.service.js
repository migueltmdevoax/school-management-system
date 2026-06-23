import db from "../../config/db.js";

export const getParentPayments = async (userId) => {
  const { rows: parentRows } = await db.query(
    `SELECT id FROM parents WHERE user_id = $1`,
    [userId]
  );

  if (!parentRows[0]) return [];
  const parentId = parentRows[0].id;

  const { rows } = await db.query(
    `SELECT
       p.id, p.amount, p.status, p.due_date, p.paid_at, p.created_at,
       s.first_name, s.last_name
     FROM payments p
     JOIN students s ON s.id = p.student_id
     JOIN parent_students ps ON ps.student_id = s.id
     WHERE ps.parent_id = $1
     ORDER BY p.created_at DESC`,
    [parentId]
  );

  return rows;
};