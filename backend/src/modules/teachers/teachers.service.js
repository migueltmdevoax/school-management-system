import db from "../../config/db.js";

// 🔥 GET ALL TEACHERS
const getAllTeachers = async () => {

  const query = `
    SELECT
      t.id,
      t.first_name,
      t.last_name,
      t.created_at,
      t.updated_at,

      u.email,

      COUNT(g.id)::int AS groups_count

    FROM teachers t

    INNER JOIN users u
      ON u.id = t.user_id

    LEFT JOIN groups g
      ON g.teacher_id = t.id

    GROUP BY
      t.id,
      u.email

    ORDER BY t.created_at DESC
  `;

  const { rows } =
    await db.query(query);

  return rows;
};


// 🔥 GET TEACHER BY ID
const getTeacherById = async (
  id
) => {

  const query = `
    SELECT
      t.id,
      t.first_name,
      t.last_name,
      t.created_at,
      t.updated_at,

      u.email

    FROM teachers t

    INNER JOIN users u
      ON u.id = t.user_id

    WHERE t.id = $1
  `;

  const { rows } =
    await db.query(query, [id]);

  return rows[0];
};


// 🔥 CREATE TEACHER
const createTeacher = async ({
  user_id,
  first_name,
  last_name
}) => {

  const query = `
    INSERT INTO teachers (
      user_id,
      first_name,
      last_name
    )
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [
    user_id,
    first_name,
    last_name
  ];

  const { rows } =
    await db.query(
      query,
      values
    );

  return rows[0];
};


// 🔥 UPDATE TEACHER
const updateTeacher = async (
  id,
  {
    first_name,
    last_name
  }
) => {

  const query = `
    UPDATE teachers
    SET
      first_name = $1,
      last_name = $2,
      updated_at = NOW()
    WHERE id = $3
    RETURNING *
  `;

  const values = [
    first_name,
    last_name,
    id
  ];

  const { rows } =
    await db.query(
      query,
      values
    );

  return rows[0];
};


// 🔥 DELETE TEACHER
const deleteTeacher = async (
  id
) => {

  const query = `
    DELETE FROM teachers
    WHERE id = $1
    RETURNING *
  `;

  const { rows } =
    await db.query(query, [id]);

  return rows[0];
};


export default {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
};