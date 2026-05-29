import db from "../../config/db.js";

export const
getParentIncidents =
async (parentId) => {

  const result =
    await db.query(

      `
      SELECT

        incidents.id,
        incidents.title,
        incidents.description,
        incidents.severity,
        incidents.created_at,

        students.first_name,
        students.last_name

      FROM incidents

      INNER JOIN students
      ON students.id = incidents.student_id

      INNER JOIN parents
      ON parents.student_id = students.id

      WHERE parents.user_id = $1

      ORDER BY incidents.created_at DESC

      LIMIT 20
      `,

      [parentId]

    );



  return result.rows;

};