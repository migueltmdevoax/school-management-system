import pool from "../../config/db.js";

export async function getStudentMetrics(studentId) {

  // 🟣 PROMEDIO
  const gradesResult = await pool.query(`
    SELECT AVG(g.grade)::numeric(10,2) as average
    FROM grades g
    JOIN assignment_students ast
      ON ast.id = g.assignment_student_id
    WHERE ast.student_id = $1
  `, [studentId]);

  const average =
    Number(gradesResult.rows[0]?.average) || 0;

  // 🟣 INCIDENTES
  const incidentsResult = await pool.query(`
    SELECT COUNT(*) as total
    FROM incidents
    WHERE student_id = $1
  `, [studentId]);

  const incidents =
    Number(incidentsResult.rows[0]?.total) || 0;

  // 🟣 PAGOS PENDIENTES
  const paymentsResult = await pool.query(`
    SELECT COUNT(*) as pending
    FROM payments
    WHERE student_id = $1
    AND status = 'PENDING'
  `, [studentId]);

  const pendingPayments =
    Number(paymentsResult.rows[0]?.pending) || 0;

  // 🟣 PROGRESO
  const progressResult = await pool.query(`
    SELECT COUNT(*) as total
    FROM assignment_students
    WHERE student_id = $1
  `, [studentId]);

  const totalAssignments =
    Number(progressResult.rows[0]?.total) || 0;

  const progress =
    Math.min(totalAssignments * 20, 100);

  // 🟣 RISK ENGINE 😈🔥
  let risk = "LOW";

  if (
    average < 7 ||
    incidents >= 3 ||
    pendingPayments >= 2
  ) {
    risk = "HIGH";
  }
  else if (
    average < 8 ||
    incidents >= 1
  ) {
    risk = "MEDIUM";
  }

  return {
    average,
    incidents,
    pendingPayments,
    progress,
    risk,
  };
}