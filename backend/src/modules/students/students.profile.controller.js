import { getStudentMetrics } from "./students.metrics.service.js";

export const getStudentProfile = async (req, res, next) => {
  try {
    const { studentId } = req.params;
    const data = await getStudentMetrics(studentId);
    return res.status(200).json({ success: true, data });
  } catch (error) {
    next(error);
  }
};