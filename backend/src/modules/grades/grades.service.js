import db from "../../config/db.js";

export const create = async ({ assignment_student_id, grade, feedback }) => {
  const { rows } = await db.query(
    `INSERT INTO grades (assignment_student_id, grade, feedback) VALUES ($1,$2,$3) RETURNING *`,
    [assignment_student_id, grade, feedback]
  );
  const created = rows[0];
  const studentRes = await db.query(
    `SELECT student_id FROM assignment_students WHERE id = $1`,
    [assignment_student_id]
  );
  return { ...created, studentId: studentRes.rows[0]?.student_id };
};

export const getAll = async () => {
  const { rows } = await db.query(`
    SELECT
      g.id, g.grade, g.feedback, g.created_at,
      ast.student_id,
      s.first_name, s.last_name,
      a.title AS assignment_title
    FROM grades g
    JOIN assignment_students ast ON ast.id = g.assignment_student_id
    JOIN students            s   ON s.id   = ast.student_id
    JOIN assignments         a   ON a.id   = ast.assignment_id
    ORDER BY g.created_at DESC
  `);
  return rows;
};

export const getByAssignmentStudent = async (assignmentStudentId) => {
  if (!assignmentStudentId) return [];
  const { rows } = await db.query(
    `SELECT * FROM grades WHERE assignment_student_id = $1 ORDER BY created_at DESC`,
    [assignmentStudentId]
  );
  return rows;
};

export const getByTeacherId = async (teacherId) => {
  if (!teacherId) return [];
  const { rows } = await db.query(`
    SELECT
      g.id, g.grade, g.feedback, g.created_at,
      s.id AS student_id, s.first_name, s.last_name,
      a.id AS assignment_id, a.title AS assignment_title
    FROM grades g
    JOIN assignment_students ast ON ast.id = g.assignment_student_id
    JOIN students            s   ON s.id   = ast.student_id
    JOIN assignments         a   ON a.id   = ast.assignment_id
    WHERE a.teacher_id = $1
    ORDER BY g.created_at DESC
  `, [teacherId]);
  return rows;
};

export const getByParentId = async (parentId) => {
  if (!parentId) return [];
  const { rows } = await db.query(`
    SELECT
      g.id, g.grade, g.feedback, g.created_at,
      s.id AS student_id, s.first_name, s.last_name,
      a.id AS assignment_id, a.title AS assignment_title
    FROM grades g
    JOIN assignment_students ast ON ast.id  = g.assignment_student_id
    JOIN students            s   ON s.id    = ast.student_id
    JOIN parent_students     ps  ON ps.student_id = s.id
    JOIN assignments         a   ON a.id    = ast.assignment_id
    WHERE ps.parent_id = $1
    ORDER BY g.created_at DESC
  `, [parentId]);
  return rows;
};