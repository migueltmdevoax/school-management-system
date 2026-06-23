import * as attendanceService from "./attendance.service.js";
import db from "../../config/db.js";

const resolveTeacherId = async (user) => {
  if (user.teacher_id) return user.teacher_id;
  const result = await db.query(
    `SELECT id FROM teachers WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

export const getAttendance = async (req, res, next) => {
  try {
    const { role } = req.user;
    const date     = req.query.date || null;

    if (role === "teacher") {
      const teacherId = await resolveTeacherId(req.user);
      if (!teacherId) {
        return res.status(404).json({ success: false, message: "Teacher not found" });
      }
      const data = await attendanceService.getAttendanceByTeacher(teacherId, date);
      return res.json({ success: true, data });
    }

    if (role === "admin") {
      const stats = await attendanceService.getAttendanceStats();
      return res.json({ success: true, data: stats });
    }

    return res.status(403).json({ success: false, message: "Forbidden" });
  } catch (error) { next(error); }
};

export const markAttendance = async (req, res, next) => {
  try {
    const { studentId, status, date } = req.body;

    if (!studentId || !status) {
      return res.status(400).json({
        success: false,
        message: "studentId and status are required",
      });
    }

    const validStatuses = ["PRESENT", "ABSENT", "LATE"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `status must be one of: ${validStatuses.join(", ")}`,
      });
    }

    const result = await attendanceService.markAttendance({
      studentId,
      status,
      date:      date || null,
      createdBy: req.user.id,
    });

    return res.status(201).json({ success: true, data: result });
  } catch (error) { next(error); }
};