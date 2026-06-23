import db from "../../config/db.js";

export const getStudentMetrics = async (studentId) => {
  const [student, incidents, payments, attendance, grades] = await Promise.all([
    db.query(
      `SELECT id, first_name, last_name, email FROM students WHERE id = $1`,
      [studentId]
    ),
    db.query(
      `SELECT COUNT(*)::int AS total FROM incidents WHERE student_id = $1`,
      [studentId]
    ),
    db.query(
      `SELECT COUNT(*)::int AS pending FROM payments WHERE student_id = $1 AND status = 'PENDING'`,
      [studentId]
    ),
    db.query(
      `SELECT
         ROUND(
           AVG(CASE WHEN status = 'PRESENT' THEN 100 ELSE 0 END)
         )::int AS attendance_rate
       FROM attendance WHERE student_id = $1`,
      [studentId]
    ),
    db.query(
      `SELECT ROUND(AVG(g.grade)::numeric, 1) AS average_grade
       FROM grades g
       JOIN assignment_students ast ON ast.id = g.assignment_student_id
       WHERE ast.student_id = $1`,
      [studentId]
    ),
  ]);

  return {
    student:       student.rows[0],
    metrics: {
      incidents:      incidents.rows[0].total,
      pendingPayments: payments.rows[0].pending,
      attendanceRate:  attendance.rows[0].attendance_rate || 0,
      averageGrade:    grades.rows[0].average_grade || 0,
    },
  };
};