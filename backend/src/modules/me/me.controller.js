import * as meService from "./me.service.js";

// Helper para obtener parent_id desde el token O desde la DB
async function resolveParentId(user, db) {
  if (user.parent_id) return user.parent_id;

  // Fallback: buscar por user_id en tabla parents
  const result = await db.query(
    `SELECT id FROM parents WHERE user_id = $1`,
    [user.id]
  );
  return result.rows[0]?.id || null;
}

export const getMyDashboard = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === "admin") {
      const data = await meService.getAdminDashboard();
      return res.json({ success: true, data });
    }

    if (role === "teacher") {
      const teacherId = req.user.teacher_id;
      if (!teacherId) {
        return res.status(400).json({
          success: false,
          message: "teacher_id not found. Please log out and log in again.",
        });
      }
      const data = await meService.getTeacherDashboard(teacherId);
      return res.json({ success: true, data });
    }

    if (role === "parent") {
      // Importamos db aquí para el fallback
      const { default: db } = await import("../../config/db.js");
      const parentId = await resolveParentId(req.user, db);

      if (!parentId) {
        return res.status(400).json({
          success: false,
          message: "parent_id not found. Please log out and log in again.",
        });
      }
      const data = await meService.getParentDashboardFull(parentId);
      return res.json({ success: true, data });
    }

    return res.status(403).json({ success: false, message: "Forbidden" });
  } catch (error) {
    next(error);
  }
};

export const getMyStudents = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === "admin") {
      return res.status(400).json({
        success: false,
        message: "Admins use /api/students",
      });
    }

    if (role === "teacher") {
      const teacherId = req.user.teacher_id;
      if (!teacherId) {
        return res.status(400).json({
          success: false,
          message: "teacher_id not found. Please log out and log in again.",
        });
      }
      const data = await meService.getTeacherStudents(teacherId);
      return res.json({ success: true, data });
    }

    if (role === "parent") {
      const { default: db } = await import("../../config/db.js");
      const parentId = await resolveParentId(req.user, db);

      if (!parentId) {
        return res.status(400).json({
          success: false,
          message: "parent_id not found. Please log out and log in again.",
        });
      }
      const data = await meService.getParentStudents(parentId);
      return res.json({ success: true, data });
    }

    return res.status(403).json({ success: false, message: "Forbidden" });
  } catch (error) {
    next(error);
  }
};

export const getMyGrades = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role !== "teacher") {
      return res.status(403).json({ success: false, message: "Teachers only" });
    }

    const teacherId = req.user.teacher_id;
    if (!teacherId) {
      return res.status(400).json({
        success: false,
        message: "teacher_id not found. Please log out and log in again.",
      });
    }

    const data = await meService.getTeacherGrades(teacherId);
    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};