import db from "../../config/db.js";

export const
getParentGrades =
async (parentId) => {

  const result =
    await db.query(

      `
      SELECT

        grades.id,
        grades.subject,
        grades.grade,
        grades.created_at,

        students.first_name,
        students.last_name

      FROM grades

      INNER JOIN students
      ON students.id = grades.student_id

      INNER JOIN parents
      ON parents.student_id = students.id

      WHERE parents.user_id = $1

      ORDER BY grades.created_at DESC

      LIMIT 50
      `,

      [parentId]

    );



  return result.rows;

};