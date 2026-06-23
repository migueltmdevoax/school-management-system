import { getDashboardMetrics } from "./dashboard.service.js";

export const getDashboard = async (req, res, next) => {
  try {
    const metrics = await getDashboardMetrics();
    return res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    next(error);
  }
};