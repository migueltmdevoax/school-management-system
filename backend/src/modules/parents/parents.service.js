import db from "../../config/db.js";

export async function getParentDashboard(parentId) {
  if (!parentId) throw new Error("parentId is required");

  const { rows: students } = await db.query(
    `SELECT s.id, s.first_name, s.last_name, s.email, s.group_id
     FROM students s
     JOIN parent_students ps ON ps.student_id = s.id
     WHERE ps.parent_id = $1`,
    [parentId]
  );

  const dashboard = await Promise.all(
    students.map(async (student) => {
      const [payments, incidents, assignments, gradesRaw, gradeAvg] =
        await Promise.all([
          db.query(
            `SELECT * FROM payments WHERE student_id = $1 ORDER BY created_at DESC`,
            [student.id]
          ),
          db.query(
            `SELECT * FROM incidents WHERE student_id = $1 ORDER BY created_at DESC`,
            [student.id]
          ),
          db.query(
            `SELECT a.* FROM assignments a
             JOIN assignment_students ast ON ast.assignment_id = a.id
             WHERE ast.student_id = $1`,
            [student.id]
          ),
          db.query(
            `SELECT g.grade, g.created_at
             FROM grades g
             JOIN assignment_students ast ON g.assignment_student_id = ast.id
             WHERE ast.student_id = $1
             ORDER BY g.created_at ASC`,
            [student.id]
          ),
          db.query(
            `SELECT ROUND(AVG(g.grade)::numeric, 2) AS average
             FROM grades g
             JOIN assignment_students ast ON g.assignment_student_id = ast.id
             WHERE ast.student_id = $1`,
            [student.id]
          ),
        ]);

      const grades = gradesRaw.rows;
      const averageGrade = Number(gradeAvg.rows[0]?.average) || 0;
      const completed = grades.length;
      const totalAssignments = assignments.rows.length;
      const pending = totalAssignments - completed;
      const pendingPaymentsCount = payments.rows.filter(
        (p) => p.status === "PENDING"
      ).length;
      const incidentCount = incidents.rows.length;

      let risk = "LOW";
      if (
        averageGrade < 70 ||
        incidentCount >= 3 ||
        pendingPaymentsCount >= 2
      ) {
        risk = "HIGH";
      } else if (averageGrade < 80 || incidentCount >= 1) {
        risk = "MEDIUM";
      }

      return {
        student,
        payments: payments.rows,
        incidents: incidents.rows,
        grades,
        assignments: assignments.rows,
        metrics: {
          averageGrade,
          incidentCount,
          pendingPayments: pendingPaymentsCount,
          completed,
          pending,
          risk,
        },
      };
    })
  );

  return dashboard;
}

export async function getAllParents() {
  const { rows } = await db.query(
    `SELECT
       p.id, p.first_name, p.last_name, p.email, p.created_at,
       u.id AS user_id, u.email AS user_email
     FROM parents p
     LEFT JOIN users u ON u.id = p.user_id
     ORDER BY p.last_name ASC`
  );
  return rows;
}

export async function getParentById(parentId) {
  const { rows } = await db.query(
    `SELECT
       p.id, p.first_name, p.last_name, p.email, p.created_at,
       u.id AS user_id, u.email AS user_email
     FROM parents p
     LEFT JOIN users u ON u.id = p.user_id
     WHERE p.id = $1`,
    [parentId]
  );
  if (!rows[0]) throw new Error("Parent not found");
  return rows[0];
}