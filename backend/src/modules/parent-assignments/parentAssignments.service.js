import db from "../../config/db.js";

export const getParentAssignments = async (userId) => {
  const { rows: parentRows } = await db.query(
    `SELECT id FROM parents WHERE user_id = $1`,
    [userId]
  );

  if (!parentRows[0]) return [];
  const parentId = parentRows[0].id;

  const { rows } = await db.query(
    `SELECT
       a.id, a.title, a.description, a.due_date, a.status, a.max_score,
       s.first_name, s.last_name
     FROM assignments a
     JOIN assignment_students ast ON ast.assignment_id = a.id
     JOIN students s ON s.id = ast.student_id
     JOIN parent_students ps ON ps.student_id = s.id
     WHERE ps.parent_id = $1
     ORDER BY a.due_date ASC`,
    [parentId]
  );

  return rows;
};