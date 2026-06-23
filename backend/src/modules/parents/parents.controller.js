import * as service from "./parents.service.js";

export async function getDashboard(req, res, next) {
  try {
    const parentId = req.user.parent_id;
    if (!parentId) {
      return res.status(400).json({
        success: false,
        message: "parent_id not found in token",
      });
    }
    const data = await service.getParentDashboard(parentId);
    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getAllParents(req, res, next) {
  try {
    const data = await service.getAllParents();
    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}

export async function getParentById(req, res, next) {
  try {
    const data = await service.getParentById(req.params.id);
    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
}