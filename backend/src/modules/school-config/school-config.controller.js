import * as configService from "./school-config.service.js";

export const getConfig = async (req, res, next) => {
  try {
    const data = await configService.getConfig();
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const updateConfig = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Admin only" });
    }
    const updated = await configService.updateConfig(req.params.id, req.body);
    return res.json({ success: true, data: updated });
  } catch (error) { next(error); }
};