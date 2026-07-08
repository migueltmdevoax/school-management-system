import * as service from "./pickup-control.service.js";
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

export const getByDate = async (req, res, next) => {
  try {
    const { role } = req.user;
    const date = req.query.date || new Date().toISOString().split("T")[0];

    if (role === "parent") {
      // 🔥 Parent ve entradas/salidas de SUS hijos
      const parentId = await resolveParentId(req.user);
      if (!parentId) return res.status(404).json({ success: false, message: "Parent not found" });
      const { rows } = await db.query(
        `SELECT pc.*, s.first_name, s.last_name
         FROM pickup_control pc
         JOIN students s ON s.id = pc.student_id
         JOIN parent_students ps ON ps.student_id = pc.student_id
         JOIN parents p ON p.id = ps.parent_id
         WHERE DATE(pc.event_time) = $1 AND p.id = $2
         ORDER BY pc.event_time DESC`,
        [date, parentId]
      );
      return res.json({ success: true, data: rows });
    }

    if (role === "admin") {
      const { rows } = await db.query(
        `SELECT pc.*, s.first_name, s.last_name
         FROM pickup_control pc
         JOIN students s ON s.id = pc.student_id
         WHERE DATE(pc.event_time) = $1
         ORDER BY pc.event_time DESC`,
        [date]
      );
      return res.json({ success: true, data: rows });
    }

    // Teacher
    const teacherId = await resolveTeacherId(req.user);
    if (!teacherId) return res.status(404).json({ success: false, message: "Teacher not found" });
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

    const parents = await db.query(
      `SELECT u.id AS user_id, s.first_name AS sf, s.last_name AS sl
       FROM parent_students ps
       JOIN parents p ON p.id = ps.parent_id
       JOIN users u ON u.id = p.user_id
       JOIN students s ON s.id = ps.student_id
       WHERE ps.student_id = $1`,
      [studentId]
    );

    const person = event_type === "LLEGADA"
      ? req.body.delivered_by || "un familiar"
      : req.body.picked_up_by || "un familiar";

    for (const p of parents.rows) {
      await createNotification({
        userId:  p.user_id,
        title:   event_type === "LLEGADA" ? "🏫 Llegada registrada" : "🏠 Salida registrada",
        message: `${p.sf} ${p.sl} ${event_type === "LLEGADA" ? "llegó" : "fue recogido/a"}. Por: ${person}`,
        type:    "pickup",
      });
    }

    return res.status(201).json({ success: true, data: entry });
  } catch (error) { next(error); }
};