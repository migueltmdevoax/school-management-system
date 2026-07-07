import * as service from "./milestones.service.js";
import db from "../../config/db.js";

export const getByStudent = async (req, res, next) => {
  try {
    const data = await service.getByStudent(req.params.studentId);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const create = async (req, res, next) => {
  try {
    if (!["admin", "teacher"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const { studentId, period } = req.body;
    if (!studentId || !period) {
      return res.status(400).json({ success: false, message: "studentId and period are required" });
    }
    const data = await service.create({ ...req.body, evaluated_by: req.user.id });
    return res.status(201).json({ success: true, data });
  } catch (error) { next(error); }
};