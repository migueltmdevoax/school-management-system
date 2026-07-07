import db from "../../config/db.js";

export const getByStudent = async (studentId) => {
  const { rows } = await db.query(
    `SELECT dm.*, u.email AS evaluated_by_email
     FROM development_milestones dm
     LEFT JOIN users u ON u.id = dm.evaluated_by
     WHERE dm.student_id = $1
     ORDER BY dm.created_at DESC`,
    [studentId]
  );
  return rows;
};

export const create = async ({
  studentId, period, evaluated_by,
  motor_gruesa, motor_fina, lenguaje,
  socioemocional, autonomia, cognicion, observations
}) => {
  const { rows } = await db.query(
    `INSERT INTO development_milestones
       (student_id, period, evaluated_by, motor_gruesa, motor_fina,
        lenguaje, socioemocional, autonomia, cognicion, observations)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
     ON CONFLICT (student_id, period)
     DO UPDATE SET
       motor_gruesa=$4, motor_fina=$5, lenguaje=$6,
       socioemocional=$7, autonomia=$8, cognicion=$9,
       observations=$10
     RETURNING *`,
    [studentId, period, evaluated_by, motor_gruesa, motor_fina,
     lenguaje, socioemocional, autonomia, cognicion, observations]
  );
  return rows[0];
};