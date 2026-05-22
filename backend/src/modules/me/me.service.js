import db
from "../../config/db.js";



// 🧠 DASHBOARD
export const getDashboard =
async (user) => {

  const {
    role,
    teacher_id,
    parent_id
  } = user;



  // 👨‍💼 ADMIN
  if (role === "admin") {

    const students =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM students
      `);

    const assignments =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM assignments
      `);

    const grades =
      await db.query(`
        SELECT COUNT(*)::int AS total
        FROM grades
      `);

    return {

      role,

      totals: {

        students:
          students.rows[0].total,

        assignments:
          assignments.rows[0].total,

        grades:
          grades.rows[0].total

      }

    };
  }



  // 👨‍🏫 TEACHER
  if (role === "teacher") {

    const assignments =
      await db.query(`

        SELECT COUNT(*)::int AS total

        FROM assignments

        WHERE teacher_id = $1

      `, [teacher_id]);



    const groups =
      await db.query(`

        SELECT COUNT(*)::int AS total

        FROM groups

        WHERE teacher_id = $1

      `, [teacher_id]);



    return {

      role,

      totals: {

        assignments:
          assignments.rows[0].total,

        groups:
          groups.rows[0].total

      }

    };
  }



  // 👨‍👩‍👧 PARENT
  if (role === "parent") {

    const students =
      await db.query(`

        SELECT COUNT(*)::int AS total

        FROM students

        WHERE parent_id = $1

      `, [parent_id]);



    const payments =
      await db.query(`

        SELECT COUNT(*)::int AS total

        FROM payments p

        INNER JOIN students s
          ON s.id = p.student_id

        WHERE s.parent_id = $1

      `, [parent_id]);



    return {

      role,

      totals: {

        students:
          students.rows[0].total,

        payments:
          payments.rows[0].total

      }

    };
  }



  return {};
};



// 👨‍🎓 GET MY STUDENTS
export const getStudents =
async (user) => {

  const {
    role,
    teacher_id,
    parent_id
  } = user;



  // 👨‍💼 ADMIN
  if (role === "admin") {

    const result =
      await db.query(`

        SELECT *

        FROM students

        ORDER BY created_at DESC

      `);

    return result.rows;
  }



  // 👨‍🏫 TEACHER
  if (role === "teacher") {

    const result =
      await db.query(`

        SELECT DISTINCT s.*

        FROM students s

        INNER JOIN group_students gs
          ON gs.student_id = s.id

        INNER JOIN groups g
          ON g.id = gs.group_id

        WHERE g.teacher_id = $1

        ORDER BY s.created_at DESC

      `, [teacher_id]);

    return result.rows;
  }



  // 👨‍👩‍👧 PARENT
  if (role === "parent") {

    const result =
      await db.query(`

        SELECT *

        FROM students

        WHERE parent_id = $1

        ORDER BY created_at DESC

      `, [parent_id]);

    return result.rows;
  }



  return [];
};



// 📚 GET MY ASSIGNMENTS
export const getAssignments =
async (user) => {

  const {
    role,
    teacher_id
  } = user;



  // 👨‍💼 ADMIN
  if (role === "admin") {

    const result =
      await db.query(`

        SELECT *

        FROM assignments

        ORDER BY created_at DESC

      `);

    return result.rows;
  }



  // 👨‍🏫 TEACHER
  if (role === "teacher") {

    const result =
      await db.query(`

        SELECT *

        FROM assignments

        WHERE teacher_id = $1

        ORDER BY created_at DESC

      `, [teacher_id]);

    return result.rows;
  }



  return [];
};



// 📝 GET MY GRADES
export const getGrades =
async (user) => {

  const {
    role,
    teacher_id,
    parent_id
  } = user;



  // 👨‍💼 ADMIN
  if (role === "admin") {

    const result =
      await db.query(`

        SELECT *

        FROM grades

        ORDER BY created_at DESC

      `);

    return result.rows;
  }



  // 👨‍🏫 TEACHER
  if (role === "teacher") {

    const result =
      await db.query(`

        SELECT

          g.*,

          a.title AS assignment_title,

          s.name AS student_name

        FROM grades g

        INNER JOIN assignment_students ast
          ON ast.id = g.assignment_student_id

        INNER JOIN assignments a
          ON a.id = ast.assignment_id

        INNER JOIN students s
          ON s.id = ast.student_id

        WHERE a.teacher_id = $1

        ORDER BY g.created_at DESC

      `, [teacher_id]);

    return result.rows;
  }



  // 👨‍👩‍👧 PARENT
  if (role === "parent") {

    const result =
      await db.query(`

        SELECT

          g.*,

          a.title AS assignment_title,

          s.name AS student_name

        FROM grades g

        INNER JOIN assignment_students ast
          ON ast.id = g.assignment_student_id

        INNER JOIN students s
          ON s.id = ast.student_id

        INNER JOIN assignments a
          ON a.id = ast.assignment_id

        WHERE s.parent_id = $1

        ORDER BY g.created_at DESC

      `, [parent_id]);

    return result.rows;
  }



  return [];
};



// 💳 GET MY PAYMENTS
export const getPayments =
async (user) => {

  const {
    role,
    parent_id
  } = user;



  // 👨‍💼 ADMIN
  if (role === "admin") {

    const result =
      await db.query(`

        SELECT *

        FROM payments

        ORDER BY created_at DESC

      `);

    return result.rows;
  }



  // 👨‍👩‍👧 PARENT
  if (role === "parent") {

    const result =
      await db.query(`

        SELECT

          p.*,

          s.name AS student_name

        FROM payments p

        INNER JOIN students s
          ON s.id = p.student_id

        WHERE s.parent_id = $1

        ORDER BY p.created_at DESC

      `, [parent_id]);

    return result.rows;
  }



  return [];
};