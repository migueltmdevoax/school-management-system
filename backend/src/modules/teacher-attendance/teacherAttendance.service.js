import db from "../../config/db.js";

export const
markTeacherAttendance =
async ({

  teacherId,

  status,

  date,

}) => {

  const result =
    await db.query(

      `
      INSERT INTO teacher_attendance (

        teacher_id,
        status,
        attendance_date

      )

      VALUES (
        $1,
        $2,
        $3
      )

      RETURNING *
      `,

      [
        teacherId,
        status,
        date,
      ]

    );



  return result.rows[0];

};





export const
getTeacherAttendance =
async (teacherId) => {

  const result =
    await db.query(

      `
      SELECT *
      FROM teacher_attendance

      WHERE teacher_id = $1

      ORDER BY attendance_date DESC
      `,

      [teacherId]

    );



  return result.rows;

};