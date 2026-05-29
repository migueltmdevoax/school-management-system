import db from "../../config/db.js";

export const bulkDeleteStudents =
async (studentIds = []) => {

  if (
    !studentIds.length
  ) {

    return [];

  }




  const query = `

    DELETE FROM students

    WHERE id = ANY($1::uuid[])

    RETURNING id

  `;




  const result =
    await db.query(

      query,

      [studentIds]

    );




  return result.rows;

};