import * as incidentsService from "./incidents.service.js";
import db from "../../config/db.js";

const resolveTeacherId = async (user) => {
  if (user.teacher_id) return user.teacher_id;
  if (user.role === "admin") return null;
  const result = await db.query(
    `SELECT id FROM teachers WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

// 🔥 Nuevo — busca el teacher correcto basándose en el grupo del estudiante
const resolveTeacherFromStudentGroup = async (studentId) => {
  const result = await db.query(
    `SELECT g.teacher_id
     FROM students s
     JOIN groups g ON g.id = s.group_id
     WHERE s.id = $1`,
    [studentId]
  );
  return result.rows[0]?.teacher_id || null;
};

export const getAllIncidents = async (req, res, next) => {
  try {
    const { role } = req.user;
    let incidents;

    if (role === "admin") {
      incidents = await incidentsService.getAll();
    } else if (role === "teacher") {
      const teacherId = await resolveTeacherId(req.user);
      incidents = await incidentsService.getByTeacher(teacherId);
    } else {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }

    return res.json({ success: true, data: incidents });
  } catch (error) { next(error); }
};

export const createIncident = async (req, res, next) => {
  try {
    const { studentId, title, description, severity } = req.body;

    if (!studentId || !title) {
      return res.status(400).json({
        success: false,
        message: "studentId and title are required",
      });
    }

    let teacherId = null;

    if (req.user.role === "teacher") {
      teacherId = await resolveTeacherId(req.user);
      if (!teacherId) {
        return res.status(400).json({
          success: false,
          message: "Teacher profile not found",
        });
      }
    } else if (req.user.role === "admin") {
      // 🔥 Admin no especifica teacher — lo resolvemos automáticamente
      // basándonos en el grupo del estudiante
      teacherId = await resolveTeacherFromStudentGroup(studentId);
      // Si el estudiante no tiene grupo asignado, teacherId queda null
      // y el incidente solo será visible para admin (comportamiento esperado)
    }

    const incident = await incidentsService.create({
      studentId,
      teacherId,
      title,
      description: description || null,
      severity:    severity    || "LOW",
    });

    return res.status(201).json({ success: true, data: incident });
  } catch (error) { next(error); }
};

export const deleteIncident = async (req, res, next) => {
  try {
    const deleted = await incidentsService.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Incident not found" });
    }
    return res.json({ success: true, data: deleted });
  } catch (error) { next(error); }
};