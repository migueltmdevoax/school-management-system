import * as service from "./daily-reports.service.js";
import db from "../../config/db.js";
import { createNotification } from "../notifications/notifications.service.js";

const resolveTeacherId = async (user) => {
  if (user.teacher_id) return user.teacher_id;
  const result = await db.query(
    `SELECT id FROM teachers WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

export const getByStudent = async (req, res, next) => {
  try {
    const data = await service.getByStudent(req.params.studentId);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getByDate = async (req, res, next) => {
  try {
    const { date } = req.query;
    const teacherId = await resolveTeacherId(req.user);
    if (!teacherId) return res.status(404).json({ success: false, message: "Teacher not found" });
    const data = await service.getByDate(date || new Date().toISOString().split("T")[0], teacherId);
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

    // 🔥 Notifica a los padres del alumno
    const parents = await db.query(
      `SELECT u.id AS user_id, u.email, p.first_name, p.last_name,
              s.first_name AS student_first, s.last_name AS student_last
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
        message: `El reporte del día de ${parent.student_first} ${parent.student_last} ya está listo`,
        type:    "daily_report",
      });
    }

    await service.markParentNotified(report.id);
    return res.status(201).json({ success: true, data: report });
  } catch (error) { next(error); }
};