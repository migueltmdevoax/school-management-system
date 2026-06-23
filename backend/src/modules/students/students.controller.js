import * as studentsService from "./students.service.js";
import { bulkDeleteStudents } from "./students.bulk.service.js";
import db from "../../config/db.js";

const resolveTeacherId = async (user) => {
  if (user.teacher_id) return user.teacher_id;
  const result = await db.query(
    `SELECT id FROM teachers WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

export const getStudents = async (req, res, next) => {
  try {
    const { role } = req.user;

    // 🔥 Teacher solo ve estudiantes de sus propios grupos
    if (role === "teacher") {
      const teacherId = await resolveTeacherId(req.user);
      if (!teacherId) {
        return res.status(404).json({ success: false, message: "Teacher profile not found" });
      }
      const students = await studentsService.getStudentsByTeacher(teacherId);
      return res.json(students);
    }

    // Admin ve a todos
    const students = await studentsService.getAllStudents();
    return res.json(students);
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
  try {
    const student = await studentsService.create(req.body);
    return res.status(201).json(student);
  } catch (error) {
    next(error);
  }
};

export const updateStudent = async (req, res, next) => {
  try {
    const updated = await studentsService.update(req.params.id, req.body);
    return res.json(updated);
  } catch (error) {
    next(error);
  }
};

export const deleteStudent = async (req, res, next) => {
  try {
    await studentsService.remove(req.params.id);
    return res.json({ success: true, message: "Student deleted" });
  } catch (error) {
    next(error);
  }
};

export const bulkDelete = async (req, res, next) => {
  try {
    const { studentIds } = req.body;
    if (!Array.isArray(studentIds) || !studentIds.length) {
      return res.status(400).json({ success: false, message: "studentIds required" });
    }
    const deleted = await bulkDeleteStudents(studentIds);
    return res.status(200).json({ success: true, deletedStudents: deleted });
  } catch (error) {
    next(error);
  }
};