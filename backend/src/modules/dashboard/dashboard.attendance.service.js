import db from "../../config/db.js";

export const getAttendanceOverview =
async () => {

  const query = `

    SELECT

      COUNT(*) FILTER (
        WHERE status = 'present'
      )::int AS present,



      COUNT(*) FILTER (
        WHERE status = 'absent'
      )::int AS absent,



      COUNT(*)::int AS total



    FROM attendance

  `;





  const result =
    await db.query(query);





  const row =
    result.rows[0];





  const attendanceRate =

    row.total > 0

      ? Math.round(
          (row.present / row.total) * 100
        )

      : 0;





  return {

    present:
      row.present,

    absent:
      row.absent,

    total:
      row.total,

    attendanceRate,

  };

};