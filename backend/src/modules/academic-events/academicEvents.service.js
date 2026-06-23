import db from "../../config/db.js";

export const getAcademicEvents = async () => {
  const { rows } = await db.query(
    `SELECT * FROM academic_events ORDER BY start_date ASC`
  );
  return rows;
};

export const createAcademicEvent = async (data) => {
  const { title, description, start_date, end_date, type, teacher_id } = data;
  if (!title || !start_date) throw new Error("title and start_date are required");

  const { rows } = await db.query(
    `INSERT INTO academic_events (title, description, start_date, end_date, type, teacher_id)
     VALUES ($1,$2,$3,$4,$5,$6)
     RETURNING *`,
    [title, description || null, start_date, end_date || null, type || null, teacher_id || null]
  );
  return rows[0];
};

export const deleteAcademicEvent = async (id) => {
  const { rows } = await db.query(
    `DELETE FROM academic_events WHERE id = $1 RETURNING *`,
    [id]
  );
  if (!rows[0]) throw new Error("Event not found");
  return rows[0];
};