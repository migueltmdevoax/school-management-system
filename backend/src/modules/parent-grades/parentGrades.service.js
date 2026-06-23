import db from "../../config/db.js";

export const getParentGrades = async (userId) => {
  const { rows: parentRows } = await db.query(
    `SELECT id FROM parents WHERE user_id = $1`,
    [userId]
  );

  if (!parentRows[0]) return [];
  const parentId = parentRows[0].id;

  const { rows } = await db.query(
    `SELECT
       g.id, g.grade, g.feedback, g.created_at,
       s.first_name, s.last_name,
       a.title AS assignment_title
     FROM grades g
     JOIN assignment_students ast ON g.assignment_student_id = ast.id
     JOIN students s ON s.id = ast.student_id
     JOIN assignments a ON a.id = ast.assignment_id
     JOIN parent_students ps ON ps.student_id = s.id
     WHERE ps.parent_id = $1
     ORDER BY g.created_at DESC
     LIMIT 50`,
    [parentId]
  );

  return rows;
};