import db from "../../config/db.js";

export const getAttendanceOverview = async () => {
  const result = await db.query(`
    SELECT
      COALESCE(COUNT(*) FILTER (WHERE status = 'present'), 0)::int AS present,
      COALESCE(COUNT(*) FILTER (WHERE status = 'absent'),  0)::int AS absent,
      COALESCE(COUNT(*),                                   0)::int AS total
    FROM attendance
  `);

  const row = result.rows[0] || { present: 0, absent: 0, total: 0 };
  const attendanceRate = row.total > 0
    ? Math.round((row.present / row.total) * 100)
    : 0;

  return {
    present:        row.present,
    absent:         row.absent,
    total:          row.total,
    attendanceRate,
  };
};