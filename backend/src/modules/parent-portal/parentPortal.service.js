import db from "../../config/db.js";

export const
getParentChildren =
async (parentId) => {

  const result =
    await db.query(

      `
      SELECT

        students.id,
        students.first_name,
        students.last_name,
        students.email

      FROM students

      INNER JOIN parents
      ON parents.student_id = students.id

      WHERE parents.user_id = $1
      `,

      [parentId]

    );



  return result.rows;

};





export const
getParentDashboard =
async (parentId) => {

  const children =
    await getParentChildren(
      parentId
    );



  return {

    children,

    totalChildren:
      children.length,

  };

};