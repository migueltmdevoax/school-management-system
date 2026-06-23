import db from "../../config/db.js";

export const getParentChildren = async (userId) => {
  const { rows: parentRows } = await db.query(
    `SELECT id FROM parents WHERE user_id = $1`,
    [userId]
  );

  if (!parentRows[0]) return [];
  const parentId = parentRows[0].id;

  const { rows } = await db.query(
    `SELECT s.id, s.first_name, s.last_name, s.email, s.group_id
     FROM students s
     JOIN parent_students ps ON ps.student_id = s.id
     WHERE ps.parent_id = $1
     ORDER BY s.last_name ASC`,
    [parentId]
  );

  return rows;
};

export const getParentDashboard = async (userId) => {
  const children = await getParentChildren(userId);
  return {
    children,
    totalChildren: children.length,
  };
};