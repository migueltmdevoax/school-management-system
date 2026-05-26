import db from "../../config/db.js";

import {
  getStudentMetrics
} from "./studentMetrics.service.js";



// 🟣 GET ALL STUDENTS
export async function getAllStudents() {

  const result = await db.query(`
    SELECT *
    FROM students
    ORDER BY created_at DESC
  `);

  const students = result.rows;

  const studentsWithMetrics =
    await Promise.all(

      students.map(
        async (student) => {

          const metrics =
            await getStudentMetrics(
              student.id
            );

          return {
            ...student,
            metrics,
          };
        }
      )
    );

  return studentsWithMetrics;
}



// 🟣 CREATE
export const create = async ({
  name,
  group_id
}) => {

  const query = `
    INSERT INTO students (
      name,
      group_id
    )

    VALUES ($1, $2)

    RETURNING *;
  `;

  const values = [
    name,
    group_id || null,
  ];

  const result =
    await db.query(
      query,
      values
    );

  return result.rows[0];
};



// 🟣 UPDATE
export const update = async (
  id,
  data
) => {

  const { name } = data;

  const result =
    await db.query(

      `
      UPDATE students

      SET name = $1

      WHERE id = $2

      RETURNING *;
      `,

      [name, id]
    );

  return result.rows[0];
};



// 🟣 DELETE
export const remove = async (
  id
) => {

  await db.query(

    `
    DELETE FROM students
    WHERE id = $1
    `,

    [id]
  );
};