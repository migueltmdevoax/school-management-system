import db from "../../config/db.js";

export const getByStudent = async (studentId) => {
  const { rows } = await db.query(
    `SELECT ml.*,
            rb.email AS requested_by_email,
            ab.email AS authorized_by_email,
            adm.email AS administered_by_email
     FROM medication_log ml
     LEFT JOIN users rb  ON rb.id  = ml.requested_by
     LEFT JOIN users ab  ON ab.id  = ml.authorized_by
     LEFT JOIN users adm ON adm.id = ml.administered_by
     WHERE ml.student_id = $1
     ORDER BY ml.requested_at DESC`,
    [studentId]
  );
  return rows;
};

export const getPending = async (teacherId) => {
  const { rows } = await db.query(
    `SELECT ml.*, s.first_name, s.last_name
     FROM medication_log ml
     JOIN students s ON s.id = ml.student_id
     JOIN groups g ON g.id = s.group_id
     WHERE g.teacher_id = $1
       AND ml.administered = false
     ORDER BY ml.requested_at ASC`,
    [teacherId]
  );
  return rows;
};

export const create = async ({ studentId, medication_name, dosage, reason, requestedBy }) => {
  const { rows } = await db.query(
    `INSERT INTO medication_log (student_id, medication_name, dosage, reason, requested_by)
     VALUES ($1,$2,$3,$4,$5) RETURNING *`,
    [studentId, medication_name, dosage, reason || null, requestedBy]
  );
  return rows[0];
};

export const authorize = async (id, authorizedBy) => {
  const { rows } = await db.query(
    `UPDATE medication_log
     SET authorized = true, authorized_by = $2, authorized_at = NOW()
     WHERE id = $1 RETURNING *`,
    [id, authorizedBy]
  );
  if (!rows[0]) throw new Error("Medication log not found");
  return rows[0];
};

export const markAdministered = async (id, administeredBy) => {
  const { rows } = await db.query(
    `UPDATE medication_log
     SET administered = true, administered_by = $2, administered_at = NOW()
     WHERE id = $1 AND authorized = true RETURNING *`,
    [id, administeredBy]
  );
  if (!rows[0]) throw new Error("Cannot administer: not found or not authorized");
  return rows[0];
};