import db from "../../config/db.js";

export const getRiskStudents = async () => {
  const result = await db.query(`
    SELECT
      s.id,
      s.first_name,
      s.last_name,
      COALESCE(i.total_incidents,  0) AS incidents,
      COALESCE(p.pending_payments, 0) AS pending_payments,
      COALESCE(g.average_grade,    0) AS average_grade
    FROM students s
    LEFT JOIN (
      SELECT student_id, COUNT(*)::int AS total_incidents
      FROM incidents GROUP BY student_id
    ) i ON i.student_id = s.id
    LEFT JOIN (
      SELECT student_id, COUNT(*)::int AS pending_payments
      FROM payments WHERE status = 'PENDING' GROUP BY student_id
    ) p ON p.student_id = s.id
    LEFT JOIN (
      SELECT ast.student_id, ROUND(AVG(g.grade)::numeric, 1) AS average_grade
      FROM grades g
      JOIN assignment_students ast ON ast.id = g.assignment_student_id
      GROUP BY ast.student_id
    ) g ON g.student_id = s.id
    ORDER BY total_incidents DESC, pending_payments DESC, average_grade ASC
    LIMIT 8
  `);

  return result.rows.map((student) => {
    let risk = "low";
    if (
      student.total_incidents  >= 3 ||
      student.pending_payments >= 2 ||
      student.average_grade    <  70
    ) {
      risk = "high";
    } else if (
      student.total_incidents  >= 1 ||
      student.pending_payments >= 1 ||
      student.average_grade    <  80
    ) {
      risk = "medium";
    }
    return { ...student, risk };
  });
};