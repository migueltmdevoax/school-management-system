import db from "../../config/db.js";

export const getAllergiesByStudent = async (studentId) => {
  const { rows } = await db.query(
    `SELECT * FROM student_allergies WHERE student_id = $1 ORDER BY severity DESC`,
    [studentId]
  );
  return rows;
};

export const createAllergy = async ({ studentId, allergy_type, description, severity, createdBy }) => {
  const { rows } = await db.query(
    `INSERT INTO student_allergies (student_id, allergy_type, description, severity, created_by)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [studentId, allergy_type, description, severity || "MEDIA", createdBy]
  );
  return rows[0];
};

export const deleteAllergy = async (id) => {
  const { rows } = await db.query(
    `DELETE FROM student_allergies WHERE id = $1 RETURNING *`, [id]
  );
  if (!rows[0]) throw new Error("Allergy not found");
  return rows[0];
};