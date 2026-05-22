import db from "../../config/db.js";

export async function createIncident({ studentId, teacherId, title, description, severity }) {
  const result = await db.query(
    `
    INSERT INTO incidents (student_id, teacher_id, title, description, severity)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
    `,
    [studentId, teacherId, title, description, severity]
  );

  return result.rows[0];
}

export async function getIncidentsByStudent(studentId) {
  const result = await db.query(
    `
    SELECT *
    FROM incidents
    WHERE student_id = $1
    ORDER BY created_at DESC
    `,
    [studentId]
  );

  return result.rows;
}