import db from "../../config/db.js";



// 🔥 GET ALL ASSIGNMENTS
export const getAllAssignments = async () => {

  const query = `

    SELECT

      a.id,
      a.title,
      a.description,
      a.group_id,
      a.teacher_id,
      a.due_date,
      a.attachment_url,
      a.attachment_type,
      a.status,
      a.max_score,
      a.allow_comments,
      a.published,
      a.created_at,

      g.name AS group_name,

      t.first_name,
      t.last_name

    FROM assignments a

    LEFT JOIN groups g
      ON g.id = a.group_id

    LEFT JOIN teachers t
      ON t.id = a.teacher_id

    ORDER BY a.created_at DESC

  `;

  const { rows } =
    await db.query(query);

  return rows;
};

// 🔥 GET ASSIGNMENTS BY TEACHER
export const getAssignmentsByTeacher =
async (teacherId) => {

  const result = await db.query(

    `
    SELECT
      *
    FROM assignments

    WHERE teacher_id = $1

    ORDER BY created_at DESC
    `,

    [teacherId]
  );

  return result.rows;

};

// 🔥 GET ASSIGNMENTS BY PARENT
export const getAssignmentsByParent =
async (parentId) => {

  const result = await db.query(

    `
    SELECT DISTINCT
      a.*

    FROM assignments a

    INNER JOIN students s
      ON s.group_id = a.group_id

    WHERE s.parent_id = $1

    ORDER BY a.created_at DESC
    `,

    [parentId]
  );

  return result.rows;

};



// 🔥 GET ASSIGNMENT BY ID
export const getAssignmentById =
async (id) => {

  const query = `

    SELECT *

    FROM assignments

    WHERE id = $1

  `;

  const { rows } =
    await db.query(query, [id]);

  return rows[0];
};



// 🔥 CREATE ASSIGNMENT
export const createAssignment =
async ({
  title,
  description,
  group_id,
  teacher_id,
  due_date,
  attachment_url,
  attachment_type,
  max_score,
  allow_comments,
  published
}) => {

  const query = `

    INSERT INTO assignments (

      title,
      description,
      group_id,
      teacher_id,
      due_date,
      attachment_url,
      attachment_type,
      max_score,
      allow_comments,
      published

    )

    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      $6,
      $7,
      $8,
      $9,
      $10
    )

    RETURNING *

  `;

  const values = [

    title,
    description,
    group_id,
    teacher_id,
    due_date,
    attachment_url,
    attachment_type,
    max_score,
    allow_comments,
    published

  ];

  const { rows } =
    await db.query(query, values);

  return rows[0];
};



// 🔥 UPDATE ASSIGNMENT
export const updateAssignment =
async (
  id,
  data
) => {

  const query = `

    UPDATE assignments

    SET

      title = $1,
      description = $2,
      due_date = $3,
      attachment_url = $4,
      attachment_type = $5,
      status = $6,
      max_score = $7,
      allow_comments = $8,
      published = $9

    WHERE id = $10

    RETURNING *

  `;

  const values = [

    data.title,
    data.description,
    data.due_date,
    data.attachment_url,
    data.attachment_type,
    data.status,
    data.max_score,
    data.allow_comments,
    data.published,
    id

  ];

  const { rows } =
    await db.query(query, values);

  return rows[0];
};



// 🔥 DELETE ASSIGNMENT
export const deleteAssignment =
async (id) => {

  const query = `

    DELETE FROM assignments

    WHERE id = $1

    RETURNING *

  `;

  const { rows } =
    await db.query(query, [id]);

  return rows[0];
};



// 🔥 CREATE SUBMISSION
export const createSubmission =
async ({
  assignment_id,
  student_id,
  submission_text,
  attachment_url,
  attachment_type
}) => {

  const query = `

    INSERT INTO assignment_submissions (

      assignment_id,
      student_id,
      submission_text,
      attachment_url,
      attachment_type,
      status

    )

    VALUES (
      $1,
      $2,
      $3,
      $4,
      $5,
      'SUBMITTED'
    )

    RETURNING *

  `;

  const values = [

    assignment_id,
    student_id,
    submission_text,
    attachment_url,
    attachment_type

  ];

  const { rows } =
    await db.query(query, values);

  return rows[0];
};



// 🔥 GRADE SUBMISSION
export const gradeSubmission =
async (
  submissionId,
  {
    grade,
    feedback
  }
) => {

  const query = `

    UPDATE assignment_submissions

    SET

      grade = $1,
      feedback = $2,
      status = 'GRADED',
      graded_at = NOW(),
      updated_at = NOW()

    WHERE id = $3

    RETURNING *

  `;

  const values = [
    grade,
    feedback,
    submissionId
  ];

  const { rows } =
    await db.query(query, values);

  return rows[0];
};