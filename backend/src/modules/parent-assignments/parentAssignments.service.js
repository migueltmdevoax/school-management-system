import db from "../../config/db.js";

export const
getParentAssignments =
async (parentId) => {

  const result =
    await db.query(

      `
      SELECT

        assignments.id,
        assignments.title,
        assignments.description,
        assignments.due_date,

        students.first_name,
        students.last_name

      FROM assignments

      INNER JOIN students
      ON students.id = assignments.student_id

      INNER JOIN parents
      ON parents.student_id = students.id

      WHERE parents.user_id = $1

      ORDER BY assignments.due_date ASC

      LIMIT 30
      `,

      [parentId]

    );



  return result.rows;

};