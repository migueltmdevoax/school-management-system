import db from "../../config/db.js";

export const
getParentPayments =
async (parentId) => {

  const result =
    await db.query(

      `
      SELECT

        payments.*,

        students.first_name,
        students.last_name

      FROM payments

      INNER JOIN students
      ON students.id = payments.student_id

      INNER JOIN parents
      ON parents.student_id = students.id

      WHERE parents.user_id = $1

      ORDER BY payments.created_at DESC
      `,

      [parentId]

    );



  return result.rows;

};