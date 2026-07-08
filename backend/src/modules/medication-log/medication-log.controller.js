import * as service from "./medication-log.service.js";
import db from "../../config/db.js";
import { createNotification } from "../notifications/notifications.service.js";

const resolveTeacherId = async (user) => {
  if (user.teacher_id) return user.teacher_id;
  const r = await db.query(`SELECT id FROM teachers WHERE user_id = $1 LIMIT 1`, [user.id]);
  return r.rows[0]?.id || null;
};

const resolveParentId = async (user) => {
  if (user.parent_id) return user.parent_id;
  const r = await db.query(`SELECT id FROM parents WHERE user_id = $1 LIMIT 1`, [user.id]);
  return r.rows[0]?.id || null;
};

export const getByStudent = async (req, res, next) => {
  try {
    const data = await service.getByStudent(req.params.studentId);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getPending = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === "parent") {
      // 🔥 Parent ve los medicamentos pendientes de SUS hijos
      const parentId = await resolveParentId(req.user);
      if (!parentId) return res.status(404).json({ success: false, message: "Parent not found" });
      const data = await service.getPendingByParent(parentId);
      return res.json({ success: true, data });
    }

    if (role === "admin") {
      // Admin ve todos
      const { rows } = await db.query(
        `SELECT ml.*, s.first_name, s.last_name
         FROM medication_log ml
         JOIN students s ON s.id = ml.student_id
         WHERE ml.administered = false
         ORDER BY ml.requested_at ASC`
      );
      return res.json({ success: true, data: rows });
    }

    // Teacher
    const teacherId = await resolveTeacherId(req.user);
    if (!teacherId) return res.status(404).json({ success: false, message: "Teacher not found" });
    const data = await service.getPendingByTeacher(teacherId);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const create = async (req, res, next) => {
  try {
    if (!["admin", "teacher"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const { studentId, medication_name, dosage } = req.body;
    if (!studentId || !medication_name || !dosage) {
      return res.status(400).json({ success: false, message: "studentId, medication_name and dosage are required" });
    }

    const entry = await service.create({ ...req.body, requestedBy: req.user.id });

    const parents = await db.query(
      `SELECT u.id AS user_id, s.first_name AS sf, s.last_name AS sl
       FROM parent_students ps
       JOIN parents p ON p.id = ps.parent_id
       JOIN users u ON u.id = p.user_id
       JOIN students s ON s.id = ps.student_id
       WHERE ps.student_id = $1`,
      [studentId]
    );

    for (const p of parents.rows) {
      await createNotification({
        userId:    p.user_id,
        title:     "💊 Autorización requerida",
        message:   `Se requiere tu autorización para administrar ${medication_name} (${dosage}) a ${p.sf} ${p.sl}`,
        type:      "medication",
        relatedId: entry.id,
      });
    }

    return res.status(201).json({ success: true, data: entry });
  } catch (error) { next(error); }
};

export const authorize = async (req, res, next) => {
  try {
    if (req.user.role !== "parent") {
      return res.status(403).json({ success: false, message: "Only parents can authorize medication" });
    }
    const data = await service.authorize(req.params.id, req.user.id);

    // Notifica a admin y teacher que ya fue autorizado
    const admins = await db.query(`SELECT id FROM users WHERE role IN ('admin', 'teacher')`);
    for (const a of admins.rows) {
      await createNotification({
        userId:  a.id,
        title:   "✅ Medicamento autorizado",
        message: `El padre autorizó la administración del medicamento`,
        type:    "medication",
      });
    }

    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const markAdministered = async (req, res, next) => {
  try {
    if (!["admin", "teacher"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const data = await service.markAdministered(req.params.id, req.user.id);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};