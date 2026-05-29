import db from "../../config/db.js";

export const
getTeacherCalendar =
async (teacherId) => {

  const result =
    await db.query(

      `
      SELECT

        id,
        title,
        start_date,
        end_date,
        type

      FROM academic_events

      WHERE teacher_id = $1

      ORDER BY start_date ASC
      `,

      [teacherId]

    );



  return result.rows;

};