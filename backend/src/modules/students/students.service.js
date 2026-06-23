import db from "../../config/db.js";

export async function getAllStudents() {
  const { rows } = await db.query(`
    SELECT
      s.id, s.first_name, s.last_name, s.email, s.age, s.phone, s.address,
      s.tutor_name, s.tutor_phone, s.group_id, s.created_at, s.updated_at,
      grp.name AS group_name,
      t.first_name AS teacher_first_name,
      t.last_name  AS teacher_last_name,
      COALESCE(i.total, 0)::int       AS incidents,
      COALESCE(p.pending, 0)::int     AS pending_payments,
      COALESCE(att.rate, 0)::int      AS attendance_rate,
      COALESCE(g.average, 0)::numeric AS average,
      CASE
        WHEN COALESCE(g.average, 0) < 70 OR COALESCE(i.total, 0) >= 3 OR COALESCE(p.pending, 0) >= 2 THEN 'high'
        WHEN COALESCE(g.average, 0) < 80 OR COALESCE(i.total, 0) >= 1 OR COALESCE(p.pending, 0) >= 1 THEN 'medium'
        ELSE 'low'
      END AS risk
    FROM students s
    LEFT JOIN groups grp ON grp.id = s.group_id
    LEFT JOIN teachers t ON t.id = grp.teacher_id
    LEFT JOIN (
      SELECT student_id, COUNT(*)::int AS total FROM incidents GROUP BY student_id
    ) i ON i.student_id = s.id
    LEFT JOIN (
      SELECT student_id, COUNT(*)::int AS pending FROM payments WHERE status = 'PENDING' GROUP BY student_id
    ) p ON p.student_id = s.id
    LEFT JOIN (
      SELECT student_id, ROUND(AVG(CASE WHEN status = 'PRESENT' THEN 100 ELSE 0 END))::int AS rate
      FROM attendance GROUP BY student_id
    ) att ON att.student_id = s.id
    LEFT JOIN (
      SELECT ast.student_id, ROUND(AVG(g.grade)::numeric, 2) AS average
      FROM grades g JOIN assignment_students ast ON ast.id = g.assignment_student_id
      GROUP BY ast.student_id
    ) g ON g.student_id = s.id
    ORDER BY s.created_at DESC
  `);

  return rows.map((s) => ({
    id:          s.id,
    first_name:  s.first_name,
    last_name:   s.last_name,
    email:       s.email,
    age:         s.age,
    phone:       s.phone,
    address:     s.address,
    tutor_name:  s.tutor_name,
    tutor_phone: s.tutor_phone,
    group_id:    s.group_id,
    group_name:  s.group_name,
    teacher_name: s.teacher_first_name ? `${s.teacher_first_name} ${s.teacher_last_name}` : null,
    created_at:  s.created_at,
    updated_at:  s.updated_at,
    status:      "synced",
    metrics: {
      incidents:       s.incidents,
      pendingPayments: s.pending_payments,
      attendanceRate:  s.attendance_rate,
      average:         Number(s.average),
      risk:            s.risk,
    },
  }));
}

// getStudentsByTeacher se mantiene igual, sin cambios

// 🔥 Nuevo — mismo query pero filtrado por los grupos del teacher
export async function getStudentsByTeacher(teacherId) {
  const { rows } = await db.query(`
    SELECT
      s.id, s.first_name, s.last_name, s.email, s.age, s.phone, s.address,
      s.tutor_name, s.tutor_phone, s.group_id, s.created_at, s.updated_at,
      COALESCE(i.total, 0)::int       AS incidents,
      COALESCE(p.pending, 0)::int     AS pending_payments,
      COALESCE(att.rate, 0)::int      AS attendance_rate,
      COALESCE(g.average, 0)::numeric AS average,
      CASE
        WHEN COALESCE(g.average, 0) < 70 OR COALESCE(i.total, 0) >= 3 OR COALESCE(p.pending, 0) >= 2 THEN 'high'
        WHEN COALESCE(g.average, 0) < 80 OR COALESCE(i.total, 0) >= 1 OR COALESCE(p.pending, 0) >= 1 THEN 'medium'
        ELSE 'low'
      END AS risk
    FROM students s
    -- 🔥 INNER JOIN con groups filtrado por teacher_id
    JOIN groups grp ON grp.id = s.group_id AND grp.teacher_id = $1
    LEFT JOIN (
      SELECT student_id, COUNT(*)::int AS total FROM incidents GROUP BY student_id
    ) i ON i.student_id = s.id
    LEFT JOIN (
      SELECT student_id, COUNT(*)::int AS pending FROM payments WHERE status = 'PENDING' GROUP BY student_id
    ) p ON p.student_id = s.id
    LEFT JOIN (
      SELECT student_id, ROUND(AVG(CASE WHEN status = 'PRESENT' THEN 100 ELSE 0 END))::int AS rate
      FROM attendance GROUP BY student_id
    ) att ON att.student_id = s.id
    LEFT JOIN (
      SELECT ast.student_id, ROUND(AVG(g.grade)::numeric, 2) AS average
      FROM grades g JOIN assignment_students ast ON ast.id = g.assignment_student_id
      GROUP BY ast.student_id
    ) g ON g.student_id = s.id
    ORDER BY s.created_at DESC
  `, [teacherId]);

  return rows.map(formatStudent);
}

// 🔥 Helper de formato compartido por ambas funciones
function formatStudent(s) {
  return {
    id:          s.id,
    first_name:  s.first_name,
    last_name:   s.last_name,
    email:       s.email,
    age:         s.age,
    phone:       s.phone,
    address:     s.address,
    tutor_name:  s.tutor_name,
    tutor_phone: s.tutor_phone,
    group_id:    s.group_id,
    created_at:  s.created_at,
    updated_at:  s.updated_at,
    status:      "synced",
    metrics: {
      incidents:       s.incidents,
      pendingPayments: s.pending_payments,
      attendanceRate:  s.attendance_rate,
      average:         Number(s.average),
      risk:            s.risk,
    },
  };
}

export const create = async ({
  first_name, last_name, email, age,
  phone, address, tutor_name, tutor_phone, group_id,
}) => {
  if (!first_name || !last_name) {
    throw new Error("first_name and last_name are required");
  }
  const { rows } = await db.query(
    `INSERT INTO students (
       first_name, last_name, email, age,
       phone, address, tutor_name, tutor_phone, group_id
     )
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
     RETURNING *`,
    [first_name, last_name, email, age || null,
     phone || null, address || null,
     tutor_name || null, tutor_phone || null, group_id || null]
  );
  return { ...rows[0], status: "synced", metrics: { incidents: 0, pendingPayments: 0, attendanceRate: 0, average: 0, risk: "low" } };
};

export const update = async (id, data) => {
  const { first_name, last_name, email, age, phone, address, tutor_name, tutor_phone, group_id } = data;
  const { rows } = await db.query(
    `UPDATE students SET
       first_name  = COALESCE($1, first_name),
       last_name   = COALESCE($2, last_name),
       email       = COALESCE($3, email),
       age         = COALESCE($4, age),
       phone       = COALESCE($5, phone),
       address     = COALESCE($6, address),
       tutor_name  = COALESCE($7, tutor_name),
       tutor_phone = COALESCE($8, tutor_phone),
       group_id    = COALESCE($9, group_id),
       updated_at  = now()
     WHERE id = $10
     RETURNING *`,
    [first_name, last_name, email, age, phone, address, tutor_name, tutor_phone, group_id, id]
  );
  if (!rows[0]) throw new Error("Student not found");
  return rows[0];
};

export const remove = async (id) => {
  const { rows } = await db.query(
    `DELETE FROM students WHERE id = $1 RETURNING id`, [id]
  );
  if (!rows[0]) throw new Error("Student not found");
  return rows[0];
};