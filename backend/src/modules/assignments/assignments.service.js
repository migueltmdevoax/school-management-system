import db from "../../config/db.js";

export const getAllAssignments = async () => {
  const { rows } = await db.query(`
    SELECT
      a.id, a.title, a.description, a.group_id, a.teacher_id,
      a.due_date, a.attachment_url, a.attachment_type,
      a.status, a.max_score, a.allow_comments, a.published, a.created_at,
      g.name        AS group_name,
      t.first_name,
      t.last_name
    FROM assignments a
    LEFT JOIN groups   g ON g.id = a.group_id
    LEFT JOIN teachers t ON t.id = a.teacher_id
    ORDER BY a.created_at DESC
  `);
  return rows;
};

export const getAssignmentsByTeacher = async (teacherId) => {
  const { rows } = await db.query(
    `SELECT * FROM assignments WHERE teacher_id = $1 ORDER BY created_at DESC`,
    [teacherId]
  );
  return rows;
};

export const getAssignmentsByParent = async (parentId) => {
  const { rows } = await db.query(
    `
    SELECT DISTINCT
      a.id, a.title, a.description, a.due_date, a.status, a.max_score,
      s.first_name, s.last_name
    FROM assignments a
    JOIN assignment_students ast ON ast.assignment_id = a.id
    JOIN students            s   ON s.id = ast.student_id
    JOIN parent_students     ps  ON ps.student_id = s.id
    WHERE ps.parent_id = $1
    ORDER BY a.due_date ASC
    `,
    [parentId]
  );
  return rows;
};

export const getAssignmentById = async (id) => {
  const { rows } = await db.query(
    `SELECT * FROM assignments WHERE id = $1`,
    [id]
  );
  return rows[0];
};

// 🔥 FIX CRÍTICO: ahora también crea los registros en assignment_students
// para cada alumno del grupo, así los parents pueden verlo
export const createAssignment = async ({
  title, description, group_id, teacher_id,
  due_date, attachment_url, attachment_type,
  max_score, allow_comments, published,
}) => {
  // 1. Crear el assignment
  const { rows } = await db.query(
    `
    INSERT INTO assignments (
      title, description, group_id, teacher_id,
      due_date, attachment_url, attachment_type,
      max_score, allow_comments, published
    )
    VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
    RETURNING *
    `,
    [title, description, group_id, teacher_id, due_date,
     attachment_url, attachment_type, max_score, allow_comments, published]
  );

  const assignment = rows[0];

  // 2. 🔥 Buscar todos los alumnos del grupo
  const studentsResult = await db.query(
    `SELECT id FROM students WHERE group_id = $1`,
    [group_id]
  );

  // 3. 🔥 Crear assignment_students para cada alumno del grupo
  // Esto es lo que permite que los parents vean la tarea
  if (studentsResult.rows.length > 0) {
    const values = studentsResult.rows
      .map((_, i) => `($1, $${i + 2}, 'pending')`)
      .join(", ");
    const params = [assignment.id, ...studentsResult.rows.map((s) => s.id)];

    await db.query(
      `INSERT INTO assignment_students (assignment_id, student_id, status)
       VALUES ${values}
       ON CONFLICT (assignment_id, student_id) DO NOTHING`,
      params
    );
  }

  return assignment;
};

export const updateAssignment = async (id, data) => {
  const { rows } = await db.query(
    `
    UPDATE assignments SET
      title          = COALESCE($1, title),
      description    = COALESCE($2, description),
      due_date       = COALESCE($3, due_date),
      attachment_url = COALESCE($4, attachment_url),
      attachment_type= COALESCE($5, attachment_type),
      status         = COALESCE($6, status),
      max_score      = COALESCE($7, max_score),
      allow_comments = COALESCE($8, allow_comments),
      published      = COALESCE($9, published)
    WHERE id = $10
    RETURNING *
    `,
    [data.title, data.description, data.due_date, data.attachment_url,
     data.attachment_type, data.status, data.max_score,
     data.allow_comments, data.published, id]
  );
  return rows[0];
};

export const deleteAssignment = async (id) => {
  const { rows } = await db.query(
    `DELETE FROM assignments WHERE id = $1 RETURNING *`,
    [id]
  );
  return rows[0];
};

export const createSubmission = async ({
  assignment_id, student_id, submission_text, attachment_url, attachment_type,
}) => {
  const { rows } = await db.query(
    `
    INSERT INTO assignment_submissions (
      assignment_id, student_id, submission_text,
      attachment_url, attachment_type, status
    )
    VALUES ($1,$2,$3,$4,$5,'SUBMITTED')
    RETURNING *
    `,
    [assignment_id, student_id, submission_text, attachment_url, attachment_type]
  );
  return rows[0];
};

export const gradeSubmission = async (submissionId, { grade, feedback }) => {
  const { rows } = await db.query(
    `
    UPDATE assignment_submissions SET
      grade      = $1,
      feedback   = $2,
      status     = 'GRADED',
      graded_at  = NOW(),
      updated_at = NOW()
    WHERE id = $3
    RETURNING *
    `,
    [grade, feedback, submissionId]
  );
  return rows[0];
};