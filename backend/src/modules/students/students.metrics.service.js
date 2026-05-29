import db from "../../config/db.js";

export const getStudentMetrics =
  async (studentId) => {

    const studentQuery = `
      SELECT
        id,
        first_name,
        last_name,
        email
      FROM students
      WHERE id = $1
    `;

    const incidentsQuery = `
      SELECT COUNT(*)::int AS total
      FROM incidents
      WHERE student_id = $1
    `;

    const paymentsQuery = `
      SELECT COUNT(*)::int AS pending
      FROM payments
      WHERE student_id = $1
      AND status = 'pending'
    `;

    const attendanceQuery = `
      SELECT
        ROUND(
          AVG(
            CASE
              WHEN status = 'present'
              THEN 100
              ELSE 0
            END
          )
        )::int AS attendance_rate
      FROM attendance
      WHERE student_id = $1
    `;

    const gradesQuery = `
      SELECT
        ROUND(
          AVG(score),
          1
        ) AS average_grade
      FROM grades
      WHERE student_id = $1
    `;

    const [
      student,
      incidents,
      payments,
      attendance,
      grades,
    ] = await Promise.all([

      db.query(
        studentQuery,
        [studentId]
      ),

      db.query(
        incidentsQuery,
        [studentId]
      ),

      db.query(
        paymentsQuery,
        [studentId]
      ),

      db.query(
        attendanceQuery,
        [studentId]
      ),

      db.query(
        gradesQuery,
        [studentId]
      ),

    ]);

    return {

      student:
        student.rows[0],

      metrics: {

        incidents:
          incidents.rows[0].total,

        pendingPayments:
          payments.rows[0].pending,

        attendanceRate:
          attendance.rows[0]
            .attendance_rate || 0,

        averageGrade:
          grades.rows[0]
            .average_grade || 0,

      },

    };

};