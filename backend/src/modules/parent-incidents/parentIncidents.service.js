import db from "../../config/db.js";

export const getParentIncidents = async (userId) => {
  const { rows: parentRows } = await db.query(
    `SELECT id FROM parents WHERE user_id = $1`,
    [userId]
  );

  if (!parentRows[0]) return [];
  const parentId = parentRows[0].id;

  const { rows } = await db.query(
    `SELECT
       i.id, i.title, i.description, i.severity, i.created_at,
       s.first_name, s.last_name
     FROM incidents i
     JOIN students s ON s.id = i.student_id
     JOIN parent_students ps ON ps.student_id = s.id
     WHERE ps.parent_id = $1
     ORDER BY i.created_at DESC
     LIMIT 20`,
    [parentId]
  );

  return rows;
};