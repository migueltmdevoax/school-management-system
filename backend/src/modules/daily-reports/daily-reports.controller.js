import * as service from "./daily-reports.service.js";
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

export const getByDate = async (req, res, next) => {
  try {
    const { role } = req.user;
    const date = req.query.date || new Date().toISOString().split("T")[0];

    if (role === "parent") {
      // 🔥 Parent ve reportes de SUS hijos
      const parentId = await resolveParentId(req.user);
      if (!parentId) return res.status(404).json({ success: false, message: "Parent not found" });
      const { rows } = await db.query(
        `SELECT dr.*, s.first_name, s.last_name
         FROM daily_reports dr
         JOIN students s ON s.id = dr.student_id
         JOIN parent_students ps ON ps.student_id = dr.student_id
         JOIN parents p ON p.id = ps.parent_id
         WHERE dr.report_date = $1 AND p.id = $2
         ORDER BY s.first_name ASC`,
        [date, parentId]
      );
      return res.json({ success: true, data: rows });
    }

    if (role === "admin") {
      // 🔥 Admin ve todos los reportes del día
      const { rows } = await db.query(
        `SELECT dr.*, s.first_name, s.last_name
         FROM daily_reports dr
         JOIN students s ON s.id = dr.student_id
         WHERE dr.report_date = $1
         ORDER BY s.first_name ASC`,
        [date]
      );
      return res.json({ success: true, data: rows });
    }

    // Teacher ve solo sus alumnos
    const teacherId = await resolveTeacherId(req.user);
    if (!teacherId) return res.status(404).json({ success: false, message: "Teacher not found" });
    const data = await service.getByDate(date, teacherId);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const create = async (req, res, next) => {
  try {
    if (!["admin", "teacher"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const { studentId } = req.body;
    if (!studentId) {
      return res.status(400).json({ success: false, message: "studentId is required" });
    }

    const report = await service.create({ ...req.body, created_by: req.user.id });

    const parents = await db.query(
      `SELECT u.id AS user_id, s.first_name AS sf, s.last_name AS sl
       FROM parent_students ps
       JOIN parents p ON p.id = ps.parent_id
       JOIN users u ON u.id = p.user_id
       JOIN students s ON s.id = ps.student_id
       WHERE ps.student_id = $1`,
      [studentId]
    );

    for (const parent of parents.rows) {
      await createNotification({
        userId:  parent.user_id,
        title:   "📋 Reporte del día disponible",
        message: `El reporte del día de ${parent.sf} ${parent.sl} ya está listo`,
        type:    "daily_report",
      });
    }

    await service.markParentNotified(report.id);
    return res.status(201).json({ success: true, data: report });
  } catch (error) { next(error); }
};