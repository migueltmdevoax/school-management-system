import db from "../../config/db.js";

export async function getParentDashboard(parentId) {
  console.log("🔥 SERVICE parentId:", parentId);

  // 1. obtener estudiantes del padre
  const studentsRes = await db.query(
    `
    SELECT s.*
    FROM parent_students ps
    JOIN students s ON ps.student_id = s.id
    WHERE ps.parent_id = $1
    `,
    [parentId]
  );

  const students = studentsRes.rows;

  const dashboard = [];

  for (const student of students) {
    // pagos
    const paymentsRes = await db.query(
      `SELECT * FROM payments WHERE student_id = $1 ORDER BY created_at DESC`,
      [student.id]
    );

    // incidentes
    const incidentsRes = await db.query(
      `SELECT * FROM incidents WHERE student_id = $1 ORDER BY created_at DESC`,
      [student.id]
    );

    // tareas
    const assignmentsRes = await db.query(
      `
      SELECT a.*
      FROM assignment_students ast
      JOIN assignments a ON ast.assignment_id = a.id
      WHERE ast.student_id = $1
      `,
      [student.id]
    );

    //grades individuales
    const gradesListRes = await db.query(
  `
     SELECT g.grade, g.created_at
     FROM grades g
     JOIN assignment_students ast ON g.assignment_student_id = ast.id
     WHERE ast.student_id = $1
     ORDER BY g.created_at ASC
    `,
    [student.id]
    );

    // calcular progreso real
    const completed = gradesListRes.rows.length;
    const totalAssignments = assignmentsRes.rows.length;

    const pending = totalAssignments - completed;

    // promedio
    const gradesRes = await db.query(
      `
      SELECT AVG(g.grade) as average
      FROM grades g
      JOIN assignment_students ast ON g.assignment_student_id = ast.id
      WHERE ast.student_id = $1
      `,
      [student.id]
    );

    const averageGrade = Number(gradesRes.rows[0].average || 0);

    dashboard.push({
     student,
     payments: paymentsRes.rows,
     incidents: incidentsRes.rows,
     grades: gradesListRes.rows,
     assignments: assignmentsRes.rows,
     metrics: {
      averageGrade,
      incidentCount: incidentsRes.rows.length,
      pendingPayments: paymentsRes.rows.filter(p => p.status === "PENDING").length,
      completed,
      pending
     }
    });
  }

  return dashboard;
}