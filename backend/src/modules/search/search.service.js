import db from "../../config/db.js";

export const globalSearch =
async (query) => {

  const searchTerm =
    `%${query}%`;




  /*
  |--------------------------------------------------------------------------
  | 🟣 STUDENTS
  |--------------------------------------------------------------------------
  */

  const students =
    await db.query(

      `
      SELECT

        id,
        first_name,
        last_name,
        email,

        'student' as entity_type

      FROM students

      WHERE

        first_name ILIKE $1

        OR

        last_name ILIKE $1

      LIMIT 5
      `,

      [searchTerm]

    );




  /*
  |--------------------------------------------------------------------------
  | 🟣 TEACHERS
  |--------------------------------------------------------------------------
  */

  const teachers =
    await db.query(

      `
      SELECT

        id,
        first_name,
        last_name,
        email,

        'teacher' as entity_type

      FROM teachers

      WHERE

        first_name ILIKE $1

        OR

        last_name ILIKE $1

      LIMIT 5
      `,

      [searchTerm]

    );




  return {

    students:
      students.rows,

    teachers:
      teachers.rows,

  };

};