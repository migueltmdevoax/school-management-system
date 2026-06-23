import * as assignmentsService from "./assignments.service.js";
import db from "../../config/db.js";

const resolveTeacherId = async (user) => {
  if (user.teacher_id) return user.teacher_id;
  const result = await db.query(
    `SELECT id FROM teachers WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

const resolveParentId = async (user) => {
  if (user.parent_id) return user.parent_id;
  const result = await db.query(
    `SELECT id FROM parents WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

export const getAssignments = async (req, res, next) => {
  try {
    const assignments = await assignmentsService.getAllAssignments();
    return res.status(200).json({ success: true, data: assignments });
  } catch (error) { next(error); }
};

export const getMyAssignments = async (req, res, next) => {
  try {
    const { role } = req.user;
    let assignments;

    if (role === "admin") {
      assignments = await assignmentsService.getAllAssignments();
    } else if (role === "teacher") {
      const teacherId = await resolveTeacherId(req.user);
      if (!teacherId) {
        return res.status(404).json({ success: false, message: "Teacher profile not found" });
      }
      assignments = await assignmentsService.getAssignmentsByTeacher(teacherId);
    } else if (role === "parent") {
      const parentId = await resolveParentId(req.user);
      if (!parentId) {
        return res.status(404).json({ success: false, message: "Parent profile not found" });
      }
      assignments = await assignmentsService.getAssignmentsByParent(parentId);
    } else {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    return res.json({ success: true, data: assignments });
  } catch (error) { next(error); }
};

export const getAssignmentById = async (req, res, next) => {
  try {
    const assignment = await assignmentsService.getAssignmentById(req.params.id);
    if (!assignment) return res.status(404).json({ success: false, message: "Assignment not found" });
    return res.status(200).json({ success: true, data: assignment });
  } catch (error) { next(error); }
};

export const createAssignment = async (req, res, next) => {
  try {
    const { title, group_id } = req.body;
    if (!title || !group_id) {
      return res.status(400).json({ success: false, message: "title and group_id are required" });
    }

    const resolvedTeacherId = req.body.teacher_id || await resolveTeacherId(req.user);
    if (!resolvedTeacherId) {
      return res.status(400).json({ success: false, message: "teacher_id is required" });
    }

    const assignment = await assignmentsService.createAssignment({
      ...req.body,
      teacher_id: resolvedTeacherId,
    });
    return res.status(201).json({ success: true, data: assignment });
  } catch (error) { next(error); }
};

export const updateAssignment = async (req, res, next) => {
  try {
    const updated = await assignmentsService.updateAssignment(req.params.id, req.body);
    if (!updated) return res.status(404).json({ success: false, message: "Assignment not found" });
    return res.status(200).json({ success: true, data: updated });
  } catch (error) { next(error); }
};

export const deleteAssignment = async (req, res, next) => {
  try {
    const deleted = await assignmentsService.deleteAssignment(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Assignment not found" });
    return res.status(200).json({ success: true, data: deleted });
  } catch (error) { next(error); }
};

export const createSubmission = async (req, res, next) => {
  try {
    const { assignment_id, student_id } = req.body;
    if (!assignment_id || !student_id) {
      return res.status(400).json({ success: false, message: "assignment_id and student_id are required" });
    }
    const submission = await assignmentsService.createSubmission(req.body);
    return res.status(201).json({ success: true, data: submission });
  } catch (error) { next(error); }
};

export const gradeSubmission = async (req, res, next) => {
  try {
    const graded = await assignmentsService.gradeSubmission(req.params.id, req.body);
    if (!graded) return res.status(404).json({ success: false, message: "Submission not found" });
    return res.status(200).json({ success: true, data: graded });
  } catch (error) { next(error); }
};