import * as gradesService from "./grades.service.js";
import db from "../../config/db.js";
import { emitToRole } from "../../realtime/emitters.js";
import { EVENTS }     from "../../realtime/events.js";

const resolveParentId = async (user) => {
  if (user.parent_id) return user.parent_id;
  const result = await db.query(
    `SELECT id FROM parents WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

const resolveTeacherId = async (user) => {
  if (user.teacher_id) return user.teacher_id;
  const result = await db.query(
    `SELECT id FROM teachers WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

export const createGrade = async (req, res, next) => {
  try {
    const { assignment_student_id, grade, feedback } = req.body;
    if (!assignment_student_id || grade === undefined) {
      return res.status(400).json({ success: false, message: "Missing data" });
    }
    if (grade < 0 || grade > 100) {
      return res.status(400).json({ success: false, message: "Invalid grade (0-100)" });
    }
    const result = await gradesService.create({ assignment_student_id, grade, feedback });

    // 🔥 Emite en tiempo real
    emitToRole("admin",   EVENTS.GRADE_CREATED, result);
    emitToRole("teacher", EVENTS.GRADE_CREATED, result);

    return res.status(201).json({ success: true, data: result });
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ success: false, message: "Grade already exists" });
    }
    next(error);
  }
};

export const createGradeByAssignmentAndStudent = async (req, res, next) => {
  try {
    const { assignment_id, student_id, grade, feedback } = req.body;

    if (!assignment_id || !student_id || grade === undefined) {
      return res.status(400).json({
        success: false,
        message: "assignment_id, student_id and grade are required",
      });
    }
    if (Number(grade) < 0 || Number(grade) > 100) {
      return res.status(400).json({ success: false, message: "Grade must be between 0 and 100" });
    }

    let asResult = await db.query(
      `SELECT id FROM assignment_students WHERE assignment_id = $1 AND student_id = $2`,
      [assignment_id, student_id]
    );

    let assignmentStudentId;
    if (asResult.rows.length > 0) {
      assignmentStudentId = asResult.rows[0].id;
    } else {
      const newAs = await db.query(
        `INSERT INTO assignment_students (assignment_id, student_id, status)
         VALUES ($1, $2, 'pending') RETURNING id`,
        [assignment_id, student_id]
      );
      assignmentStudentId = newAs.rows[0].id;
    }

    const gradeResult = await db.query(
      `INSERT INTO grades (assignment_student_id, grade, feedback)
       VALUES ($1, $2, $3)
       ON CONFLICT (assignment_student_id)
       DO UPDATE SET grade = $2, feedback = $3
       RETURNING *`,
      [assignmentStudentId, Number(grade), feedback || null]
    );

    const saved = gradeResult.rows[0];

    // 🔥 Emite en tiempo real a todos los roles relevantes
    emitToRole("admin",   EVENTS.GRADE_CREATED, saved);
    emitToRole("teacher", EVENTS.GRADE_CREATED, saved);

    // 🔥 También notifica a los parents del estudiante
    const parentResult = await db.query(
      `SELECT u.id AS user_id FROM parent_students ps
       JOIN parents p ON p.id = ps.parent_id
       JOIN users u ON u.id = p.user_id
       WHERE ps.student_id = $1`,
      [student_id]
    );
    parentResult.rows.forEach((row) => {
      emitToRole("parent", EVENTS.GRADE_CREATED, saved);
    });

    return res.status(201).json({ success: true, data: saved });
  } catch (error) {
    next(error);
  }
};

export const getAllGrades = async (req, res, next) => {
  try {
    const { role } = req.user;
    let grades;
    if      (role === "admin")   grades = await gradesService.getAll();
    else if (role === "teacher") {
      const tid = await resolveTeacherId(req.user);
      if (!tid) return res.status(404).json({ success: false, message: "Teacher not found" });
      grades = await gradesService.getByTeacherId(tid);
    }
    else if (role === "parent") {
      const pid = await resolveParentId(req.user);
      if (!pid) return res.status(404).json({ success: false, message: "Parent not found" });
      grades = await gradesService.getByParentId(pid);
    }
    else return res.status(403).json({ success: false, message: "Forbidden" });
    return res.json({ success: true, data: grades });
  } catch (error) { next(error); }
};

export const getGradesByAssignmentStudent = async (req, res, next) => {
  try {
    const result = await gradesService.getByAssignmentStudent(
      req.params.assignment_student_id
    );
    return res.json({ success: true, data: result });
  } catch (error) { next(error); }
};