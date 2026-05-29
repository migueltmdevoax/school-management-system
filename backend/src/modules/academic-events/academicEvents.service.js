import db from "../../config/db.js";

export const
getAcademicEvents =
async () => {

  const result =
    await db.query(

      `
      SELECT *

      FROM academic_events

      ORDER BY start_date ASC
      `

    );



  return result.rows;

};





export const
createAcademicEvent =
async (data) => {

  const result =
    await db.query(

      `
      INSERT INTO academic_events (

        title,
        description,
        start_date,
        end_date,
        type

      )

      VALUES ($1, $2, $3, $4, $5)

      RETURNING *
      `,

      [

        data.title,
        data.description,
        data.start_date,
        data.end_date,
        data.type,

      ]

    );



  return result.rows[0];

};