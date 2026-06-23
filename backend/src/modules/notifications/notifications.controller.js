import * as notificationsService from "./notifications.service.js";

export const getMyNotifications = async (req, res) => {
  try {
    const notifications = await notificationsService.getUserNotifications(req.user.id);
    return res.status(200).json({ success: true, data: notifications });
  } catch (error) {
    console.error("❌ getMyNotifications error:", error);
    return res.status(500).json({ success: false, message: "Failed to fetch notifications" });
  }
};

export const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await notificationsService.markAsRead(req.params.id);
    return res.status(200).json({ success: true, data: notification });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update notification" });
  }
};

// 🔥 Nuevo — marca todas las del usuario como leídas
export const markAllAsRead = async (req, res) => {
  try {
    await notificationsService.markAllAsRead(req.user.id);
    return res.status(200).json({ success: true, message: "All notifications marked as read" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update notifications" });
  }
};

export const createNotification = async (req, res) => {
  try {
    const notification = await notificationsService.createNotification({
      userId:  req.body.user_id,
      title:   req.body.title,
      message: req.body.message,
      type:    req.body.type || null,
    });
    return res.status(201).json({ success: true, data: notification });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to create notification" });
  }
};