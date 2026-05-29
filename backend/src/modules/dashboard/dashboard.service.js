import db from "../../config/db.js";

import {
  getRiskStudents,
} from "./dashboard.risk.service.js";

import {
  getAttendanceOverview,
} from "./dashboard.attendance.service.js";

export const getDashboardMetrics =
async () => {

  /*
  |--------------------------------------------------------------------------
  | 🟣 DASHBOARD QUERIES
  |--------------------------------------------------------------------------
  */

  const studentsQuery = `
    SELECT COUNT(*)::int AS total
    FROM students
  `;




  const incidentsQuery = `
    SELECT COUNT(*)::int AS total
    FROM incidents
  `;




  const pendingPaymentsQuery = `
    SELECT COUNT(*)::int AS total
    FROM payments
    WHERE status = 'PENDING'
  `;




  const activityQuery = `

    SELECT
      id,
      action,
      title,
      description,
      created_at

    FROM activity_logs

    ORDER BY created_at DESC

    LIMIT 10

  `;




  const attendanceStatsQuery = `

    SELECT

      COUNT(*) FILTER (
        WHERE status = 'PRESENT'
      )::int AS present,

      COUNT(*) FILTER (
        WHERE status = 'ABSENT'
      )::int AS absent,

      COUNT(*) FILTER (
        WHERE status = 'LATE'
      )::int AS late

    FROM attendance

  `;




  const attendanceHeatmapQuery = `

    SELECT

      attendance_date,

      COUNT(*) FILTER (
        WHERE status = 'PRESENT'
      )::int AS present,

      COUNT(*) FILTER (
        WHERE status = 'ABSENT'
      )::int AS absent,

      COUNT(*) FILTER (
        WHERE status = 'LATE'
      )::int AS late

    FROM attendance

    GROUP BY attendance_date

    ORDER BY attendance_date DESC

    LIMIT 30

  `;





  /*
  |--------------------------------------------------------------------------
  | 🟣 EXECUTE QUERIES
  |--------------------------------------------------------------------------
  */

  const [

    students,

    incidents,

    pendingPayments,

    activity,

    attendanceStats,

    attendanceHeatmap,

  ] = await Promise.all([

    db.query(
      studentsQuery
    ),

    db.query(
      incidentsQuery
    ),

    db.query(
      pendingPaymentsQuery
    ),

    db.query(
      activityQuery
    ),

    db.query(
      attendanceStatsQuery
    ),

    db.query(
      attendanceHeatmapQuery
    ),

  ]);





  /*
  |--------------------------------------------------------------------------
  | 🟣 EXTRA SERVICES
  |--------------------------------------------------------------------------
  */

  const riskStudents =
    await getRiskStudents();




  const attendanceOverview =
    await getAttendanceOverview();





  /*
  |--------------------------------------------------------------------------
  | 🟣 RETURN METRICS
  |--------------------------------------------------------------------------
  */

  return {

    students:
      students.rows[0].total,



    incidents:
      incidents.rows[0].total,



    pendingPayments:
      pendingPayments.rows[0].total,



    attendance:
      92,



    recentActivity:
      activity.rows,



    riskStudents,



    attendanceOverview,



    attendanceStats:
      attendanceStats.rows[0],



    attendanceHeatmap:
      attendanceHeatmap.rows,

  };

};