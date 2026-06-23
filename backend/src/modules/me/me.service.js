import db from "../../config/db.js";

export const getAdminDashboard = async () => {
  const [students, teachers, payments, incidents, attendance] = await Promise.all([
    db.query(`SELECT COUNT(*)::int AS total FROM students`),
    db.query(`SELECT COUNT(*)::int AS total FROM teachers`),
    db.query(`SELECT COUNT(*)::int AS total FROM payments WHERE status = 'PENDING'`),
    db.query(`SELECT COUNT(*)::int AS total FROM incidents`),
    db.query(`
      SELECT
        COALESCE(COUNT(*) FILTER (WHERE status = 'PRESENT'), 0)::int AS present,
        COALESCE(COUNT(*), 0)::int AS total
      FROM attendance
    `),
  ]);

  const att = attendance.rows[0];
  return {
    totalStudents:   students.rows[0].total,
    totalTeachers:   teachers.rows[0].total,
    pendingPayments: payments.rows[0].total,
    totalIncidents:  incidents.rows[0].total,
    attendanceRate:  att.total > 0 ? Math.round((att.present / att.total) * 100) : 0,
  };
};

export const getTeacherDashboard = async (teacherId) => {
  const [studentsResult, assignmentsResult, gradesResult] = await Promise.all([
    db.query(
      `SELECT DISTINCT s.id, s.first_name, s.last_name, s.email, s.group_id
       FROM students s
       LEFT JOIN groups g ON g.id = s.group_id
       WHERE g.teacher_id = $1`,
      [teacherId]
    ),
    db.query(`SELECT * FROM assignments WHERE teacher_id = $1 ORDER BY created_at DESC`, [teacherId]),
    db.query(`
      SELECT g.*, s.first_name, s.last_name, s.id AS student_id, a.title AS assignment_title
      FROM grades g
      JOIN assignment_students ast ON ast.id = g.assignment_student_id
      JOIN students s ON s.id = ast.student_id
      JOIN assignments a ON a.id = ast.assignment_id
      WHERE a.teacher_id = $1
      ORDER BY g.created_at DESC
    `, [teacherId]),
  ]);

  const students    = studentsResult.rows;
  const assignments = assignmentsResult.rows;
  const grades      = gradesResult.rows;

  const riskStudents = students.filter((s) => {
    const sg  = grades.filter((g) => String(g.student_id) === String(s.id));
    const avg = sg.length > 0
      ? sg.reduce((acc, g) => acc + Number(g.grade), 0) / sg.length
      : null;
    // Solo es risk si TIENE calificaciones y el promedio es bajo
    return avg !== null && avg < 70;
  }).length;

  return {
    totalStudents:      students.length,
    riskStudents,
    totalAssignments:   assignments.length,
    pendingSubmissions: 0,
    students,
    assignments,
    grades,
  };
};

export const getTeacherStudents = async (teacherId) => {
  const { rows } = await db.query(
    `SELECT DISTINCT s.id, s.first_name, s.last_name, s.email, s.group_id, g.name AS group_name
     FROM students s
     LEFT JOIN groups g ON g.id = s.group_id
     WHERE g.teacher_id = $1
     ORDER BY s.last_name ASC`,
    [teacherId]
  );
  return rows;
};

export const getTeacherGrades = async (teacherId) => {
  const { rows } = await db.query(`
    SELECT gr.id, gr.grade, gr.feedback, gr.created_at,
           s.id AS student_id, s.first_name, s.last_name,
           a.id AS assignment_id, a.title AS assignment_title
    FROM grades gr
    JOIN assignment_students ast ON ast.id = gr.assignment_student_id
    JOIN students s ON s.id = ast.student_id
    JOIN assignments a ON a.id = ast.assignment_id
    WHERE a.teacher_id = $1
    ORDER BY gr.created_at DESC
  `, [teacherId]);
  return rows;
};

// 🔥 FIX CRÍTICO: Una sola query masiva en lugar de loop secuencial
export const getParentDashboardFull = async (parentId) => {
  // Verificar primero que el parent existe y tiene hijos
  const studentsResult = await db.query(
    `SELECT s.id, s.first_name, s.last_name, s.email, s.group_id
     FROM students s
     JOIN parent_students ps ON ps.student_id = s.id
     WHERE ps.parent_id = $1
     ORDER BY s.first_name ASC`,
    [parentId]
  );

  const students = studentsResult.rows;
  if (students.length === 0) return [];

  const studentIds = students.map((s) => s.id);

  // 🔥 TODAS las queries en paralelo con los IDs correctos
  const [paymentsRes, incidentsRes, gradesRes, gradeAvgRes] = await Promise.all([
    db.query(
      `SELECT * FROM payments
       WHERE student_id = ANY($1::uuid[])
       ORDER BY created_at DESC`,
      [studentIds]
    ),
    db.query(
      `SELECT * FROM incidents
       WHERE student_id = ANY($1::uuid[])
       ORDER BY created_at DESC`,
      [studentIds]
    ),
    db.query(
      `SELECT g.grade, g.created_at, ast.student_id, a.title AS assignment_title
       FROM grades g
       JOIN assignment_students ast ON g.assignment_student_id = ast.id
       JOIN assignments a ON a.id = ast.assignment_id
       WHERE ast.student_id = ANY($1::uuid[])
       ORDER BY g.created_at DESC`,
      [studentIds]
    ),
    db.query(
      `SELECT ast.student_id, ROUND(AVG(g.grade)::numeric, 2) AS average
       FROM grades g
       JOIN assignment_students ast ON g.assignment_student_id = ast.id
       WHERE ast.student_id = ANY($1::uuid[])
       GROUP BY ast.student_id`,
      [studentIds]
    ),
  ]);

  // Agrupar por student_id
  const paymentsByStudent  = {};
  const incidentsByStudent = {};
  const gradesByStudent    = {};
  const avgByStudent       = {};

  paymentsRes.rows.forEach((p)  => {
    if (!paymentsByStudent[p.student_id])  paymentsByStudent[p.student_id]  = [];
    paymentsByStudent[p.student_id].push(p);
  });

  incidentsRes.rows.forEach((i) => {
    if (!incidentsByStudent[i.student_id]) incidentsByStudent[i.student_id] = [];
    incidentsByStudent[i.student_id].push(i);
  });

  gradesRes.rows.forEach((g) => {
    if (!gradesByStudent[g.student_id]) gradesByStudent[g.student_id] = [];
    gradesByStudent[g.student_id].push(g);
  });

  gradeAvgRes.rows.forEach((r) => {
    avgByStudent[r.student_id] = Number(r.average);
  });

  // Construir dashboard por alumno
  return students.map((student) => {
    const payments  = paymentsByStudent[student.id]  || [];
    const incidents = incidentsByStudent[student.id] || [];
    const grades    = gradesByStudent[student.id]    || [];
    const avg       = avgByStudent[student.id]       || 0;

    const pendingPayments = payments.filter((p) => 
      p.status === "PENDING" || p.status === "OVERDUE"
    ).length;
    const overdueCount = payments.filter((p) => p.status === "OVERDUE").length;
    const incidentCount   = incidents.length;
    const completed       = grades.length;
    const pending         = 0;

    let risk = "LOW";
    if (avg > 0 && avg < 70 || incidentCount >= 3 || overdueCount >= 1 || pendingPayments >= 2) {
      risk = "HIGH";
    } else if (avg > 0 && avg < 80 || incidentCount >= 1 || pendingPayments >= 1) {
      risk = "MEDIUM";
    }

    return {
      student,
      payments,
      incidents,
      grades,
      metrics: {
        averageGrade:    avg,
        incidentCount,
        pendingPayments,
        completed,
        pending,
        risk,
      },
    };
  });
};

export const getParentStudents = async (parentId) => {
  const { rows } = await db.query(
    `SELECT s.id, s.first_name, s.last_name, s.email, s.group_id
     FROM students s
     JOIN parent_students ps ON ps.student_id = s.id
     WHERE ps.parent_id = $1
     ORDER BY s.last_name ASC`,
    [parentId]
  );
  return rows;
};