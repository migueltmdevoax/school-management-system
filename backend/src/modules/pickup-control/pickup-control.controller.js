import * as service from "./pickup-control.service.js";
import db from "../../config/db.js";
import { createNotification } from "../notifications/notifications.service.js";

const resolveTeacherId = async (user) => {
  if (user.teacher_id) return user.teacher_id;
  const r = await db.query(`SELECT id FROM teachers WHERE user_id = $1 LIMIT 1`, [user.id]);
  return r.rows[0]?.id || null;
};

export const getByDate = async (req, res, next) => {
  try {
    const teacherId = await resolveTeacherId(req.user);
    if (!teacherId) return res.status(404).json({ success: false, message: "Teacher not found" });
    const date = req.query.date || new Date().toISOString().split("T")[0];
    const data = await service.getByDate(date, teacherId);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getByStudent = async (req, res, next) => {
  try {
    const date = req.query.date || new Date().toISOString().split("T")[0];
    const data = await service.getByStudent(req.params.studentId, date);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const create = async (req, res, next) => {
  try {
    if (!["admin", "teacher"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const { studentId, event_type } = req.body;
    if (!studentId || !event_type) {
      return res.status(400).json({ success: false, message: "studentId and event_type are required" });
    }

    const entry = await service.create({ ...req.body, registeredBy: req.user.id });

    // 🔥 Notifica al padre en tiempo real
    const parents = await db.query(
      `SELECT u.id AS user_id, s.first_name AS sf, s.last_name AS sl
       FROM parent_students ps
       JOIN parents p ON p.id = ps.parent_id
       JOIN users u ON u.id = p.user_id
       JOIN students s ON s.id = ps.student_id
       WHERE ps.student_id = $1`,
      [studentId]
    );

    const eventLabel = event_type === "LLEGADA" ? "llegó a la escuela" : "fue recogido/a";
    const person = event_type === "LLEGADA"
      ? req.body.delivered_by || "un familiar"
      : req.body.picked_up_by || "un familiar";

    for (const p of parents.rows) {
      await createNotification({
        userId:  p.user_id,
        title:   event_type === "LLEGADA" ? "🏫 Llegada registrada" : "🏠 Salida registrada",
        message: `${p.sf} ${p.sl} ${eventLabel}. Entregado/recogido por: ${person}`,
        type:    "pickup",
      });
    }

    return res.status(201).json({ success: true, data: entry });
  } catch (error) { next(error); }
};