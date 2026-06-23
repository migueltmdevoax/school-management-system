import db from "../../config/db.js";
import { getRiskStudents }      from "./dashboard.risk.service.js";
import { getAttendanceOverview } from "./dashboard.attendance.service.js";

export const getDashboardMetrics = async () => {
  const [
    students,
    incidents,
    pendingPayments,
    activity,
    attendanceStats,
    attendanceHeatmap,
  ] = await Promise.all([
    db.query(`SELECT COUNT(*)::int AS total FROM students`),
    db.query(`SELECT COUNT(*)::int AS total FROM incidents`),
    db.query(`SELECT COUNT(*)::int AS total FROM payments WHERE status = 'PENDING'`),
    db.query(`
      SELECT id, action, title, description, created_at
      FROM activity_logs
      ORDER BY created_at DESC
      LIMIT 10
    `),
    db.query(`
      SELECT
        COALESCE(COUNT(*) FILTER (WHERE status = 'PRESENT'), 0)::int AS present,
        COALESCE(COUNT(*) FILTER (WHERE status = 'ABSENT'),  0)::int AS absent,
        COALESCE(COUNT(*) FILTER (WHERE status = 'LATE'),    0)::int AS late
      FROM attendance
    `),
    db.query(`
      SELECT
        attendance_date,
        COALESCE(COUNT(*) FILTER (WHERE status = 'PRESENT'), 0)::int AS present,
        COALESCE(COUNT(*) FILTER (WHERE status = 'ABSENT'),  0)::int AS absent,
        COALESCE(COUNT(*) FILTER (WHERE status = 'LATE'),    0)::int AS late
      FROM attendance
      GROUP BY attendance_date
      ORDER BY attendance_date DESC
      LIMIT 30
    `),
  ]);

  const riskStudents       = await getRiskStudents();
  const attendanceOverview = await getAttendanceOverview();

  const stats = attendanceStats.rows[0] || { present: 0, absent: 0, late: 0 };

  const total = stats.present + stats.absent + stats.late;
  const attendanceRate = total > 0
    ? Math.round((stats.present / total) * 100)
    : 0;

  return {
    students:         students.rows[0].total,
    incidents:        incidents.rows[0].total,
    pendingPayments:  pendingPayments.rows[0].total,
    attendance:       attendanceRate,
    recentActivity:   activity.rows,
    riskStudents,
    attendanceOverview,
    attendanceStats:  stats,
    attendanceHeatmap: attendanceHeatmap.rows,
  };
};