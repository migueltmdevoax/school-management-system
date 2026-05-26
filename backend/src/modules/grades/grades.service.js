import db from "../../config/db.js";



// 🟣 CREATE GRADE
export const create = async ({
  assignment_student_id,
  grade,
  feedback
}) => {

  const query = `

    INSERT INTO grades (
      assignment_student_id,
      grade,
      feedback
    )

    VALUES ($1, $2, $3)

    RETURNING *;

  `;

  const values = [
    assignment_student_id,
    grade,
    feedback
  ];

  const result =
    await db.query(query, values);

  const createdGrade =
    result.rows[0];



  // 🔥 GET REAL STUDENT ID
  const studentResult =
    await db.query(`

      SELECT
        ast.student_id

      FROM assignment_students ast

      WHERE ast.id = $1

    `, [assignment_student_id]);



  const studentId =
    studentResult.rows[0]?.student_id;



  return {
    ...createdGrade,
    studentId,
  };
};



// 🟣 GET ALL GRADES
export const getAll = async () => {

  const result = await db.query(`

    SELECT

      g.id,
      g.grade,
      g.feedback,
      g.created_at,

      ast.student_id,

      s.name AS student_name,

      a.title AS assignment_title

    FROM grades g

    INNER JOIN assignment_students ast
      ON ast.id = g.assignment_student_id

    INNER JOIN students s
      ON s.id = ast.student_id

    INNER JOIN assignments a
      ON a.id = ast.assignment_id

    ORDER BY g.created_at DESC

  `);

  return result.rows || [];
};



// 🟣 GET BY ASSIGNMENT STUDENT
export const getByAssignmentStudent =
async (assignmentStudentId) => {

  if (!assignmentStudentId) {
    return [];
  }

  const result = await db.query(`

    SELECT *

    FROM grades

    WHERE assignment_student_id = $1

    ORDER BY created_at DESC

  `, [assignmentStudentId]);

  return result.rows || [];
};



// 🟣 GET GRADES BY TEACHER
export const getByTeacherId =
async (teacherId) => {

  // 🔥 SAFE GUARD
  if (!teacherId) {
    return [];
  }

  const result =
    await db.query(`

      SELECT

        g.id,
        g.grade,
        g.feedback,
        g.created_at,

        s.id AS student_id,
        s.name AS student_name,

        a.id AS assignment_id,
        a.title AS assignment_title

      FROM grades g

      INNER JOIN assignment_students ast
        ON ast.id = g.assignment_student_id

      INNER JOIN students s
        ON s.id = ast.student_id

      INNER JOIN assignments a
        ON a.id = ast.assignment_id

      WHERE a.teacher_id = $1

      ORDER BY g.created_at DESC

    `, [teacherId]);

  return result.rows || [];
};



// 🟣 GET GRADES BY PARENT
export const getByParentId =
async (parentId) => {

  // 🔥 SAFE GUARD
  if (!parentId) {
    return [];
  }

  const result =
    await db.query(`

      SELECT

        g.id,
        g.grade,
        g.feedback,
        g.created_at,

        s.id AS student_id,
        s.name AS student_name,

        a.id AS assignment_id,
        a.title AS assignment_title

      FROM grades g

      INNER JOIN assignment_students ast
        ON ast.id = g.assignment_student_id

      INNER JOIN students s
        ON s.id = ast.student_id

      INNER JOIN assignments a
        ON a.id = ast.assignment_id

      WHERE s.parent_id = $1

      ORDER BY g.created_at DESC

    `, [parentId]);

  return result.rows || [];
};