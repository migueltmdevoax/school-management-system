import db from "../../config/db.js";

// 🔥 GET ALL GROUPS — para admin
export const getAllGroups = async () => {
  const query = `
    SELECT id, name, teacher_id
    FROM groups
    ORDER BY name ASC
  `;
  const { rows } = await db.query(query);
  return rows;
};

// 🔥 GET GROUPS BY TEACHER — solo los grupos de ese teacher
export const getGroupsByTeacher = async (teacherId) => {
  const query = `
    SELECT id, name, teacher_id
    FROM groups
    WHERE teacher_id = $1
    ORDER BY name ASC
  `;
  const { rows } = await db.query(query, [teacherId]);
  return rows;
};