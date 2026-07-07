import * as allergiesService from "./allergies.service.js";

export const getAllergiesByStudent = async (req, res, next) => {
  try {
    const data = await allergiesService.getAllergiesByStudent(req.params.studentId);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const createAllergy = async (req, res, next) => {
  try {
    if (!["admin", "teacher"].includes(req.user.role)) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    const { studentId, allergy_type, description, severity } = req.body;
    if (!studentId || !allergy_type || !description) {
      return res.status(400).json({ success: false, message: "studentId, allergy_type and description are required" });
    }
    const data = await allergiesService.createAllergy({
      studentId, allergy_type, description, severity,
      createdBy: req.user.id,
    });
    return res.status(201).json({ success: true, data });
  } catch (error) { next(error); }
};

export const deleteAllergy = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin only" });
    }
    const data = await allergiesService.deleteAllergy(req.params.id);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};