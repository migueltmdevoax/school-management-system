import db from "../../config/db.js";

export const
getParentAttendance =
async (parentId) => {

  const result =
    await db.query(

      `
      SELECT

        attendance.id,
        attendance.status,
        attendance.attendance_date,

        students.first_name,
        students.last_name

      FROM attendance

      INNER JOIN students
      ON students.id = attendance.student_id

      INNER JOIN parents
      ON parents.student_id = students.id

      WHERE parents.user_id = $1

      ORDER BY attendance.attendance_date DESC

      LIMIT 30
      `,

      [parentId]

    );



  return result.rows;

};