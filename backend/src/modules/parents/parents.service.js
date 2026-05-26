import db from "../../config/db.js";

export async function getParentDashboard(parentId) {

  console.log("🔥 SERVICE parentId:", parentId);

  // 🟣 OBTENER ESTUDIANTES DEL PADRE
  const studentsRes = await db.query(
    `
    SELECT s.*
    FROM parent_students ps
    JOIN students s
      ON ps.student_id = s.id
    WHERE ps.parent_id = $1
    `,
    [parentId]
  );

  const students = studentsRes.rows;

  const dashboard = [];



  // 🟣 RECORRER ESTUDIANTES
  for (const student of students) {

    // 💳 PAGOS
    const paymentsRes = await db.query(
      `
      SELECT *
      FROM payments
      WHERE student_id = $1
      ORDER BY created_at DESC
      `,
      [student.id]
    );



    // 🚨 INCIDENTES
    const incidentsRes = await db.query(
      `
      SELECT *
      FROM incidents
      WHERE student_id = $1
      ORDER BY created_at DESC
      `,
      [student.id]
    );



    // 📚 TAREAS
    const assignmentsRes = await db.query(
      `
      SELECT a.*

      FROM assignment_students ast

      JOIN assignments a
        ON ast.assignment_id = a.id

      WHERE ast.student_id = $1
      `,
      [student.id]
    );



    // 📝 GRADES
    const gradesListRes = await db.query(
      `
      SELECT
        g.grade,
        g.created_at

      FROM grades g

      JOIN assignment_students ast
        ON g.assignment_student_id = ast.id

      WHERE ast.student_id = $1

      ORDER BY g.created_at ASC
      `,
      [student.id]
    );



    // 📈 PROGRESO
    const completed =
      gradesListRes.rows.length;

    const totalAssignments =
      assignmentsRes.rows.length;

    const pending =
      totalAssignments - completed;



    // ⭐ PROMEDIO
    const gradesRes = await db.query(
      `
      SELECT
        AVG(g.grade)::numeric(10,2) as average

      FROM grades g

      JOIN assignment_students ast
        ON g.assignment_student_id = ast.id

      WHERE ast.student_id = $1
      `,
      [student.id]
    );

    const averageGrade =
      Number(
        gradesRes.rows[0]?.average
      ) || 0;



    // 🚨 RISK ENGINE
    let risk = "LOW";

    if (
      averageGrade < 7 ||
      incidentsRes.rows.length >= 3 ||
      paymentsRes.rows.filter(
        p => p.status === "PENDING"
      ).length >= 2
    ) {

      risk = "HIGH";
    }

    else if (
      averageGrade < 8 ||
      incidentsRes.rows.length >= 1
    ) {

      risk = "MEDIUM";
    }



    // 🟣 PUSH FINAL
    dashboard.push({

      student,

      payments:
        paymentsRes.rows,

      incidents:
        incidentsRes.rows,

      grades:
        gradesListRes.rows,

      assignments:
        assignmentsRes.rows,

      metrics: {

        averageGrade,

        incidentCount:
          incidentsRes.rows.length,

        pendingPayments:
          paymentsRes.rows.filter(
            p => p.status === "PENDING"
          ).length,

        completed,

        pending,

        risk,
      },
    });
  }



  return dashboard;
}