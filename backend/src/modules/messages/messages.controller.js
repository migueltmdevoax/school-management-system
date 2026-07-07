import * as service from "./messages.service.js";
import { createNotification } from "../notifications/notifications.service.js";
import { emitToUser } from "../../realtime/emitters.js";

export const getMyConversations = async (req, res, next) => {
  try {
    const data = await service.getMyConversations(req.user.id);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const getConversation = async (req, res, next) => {
  try {
    const { otherUserId, studentId } = req.query;
    if (!otherUserId) {
      return res.status(400).json({ success: false, message: "otherUserId is required" });
    }
    await service.markRead(req.user.id, otherUserId);
    const data = await service.getConversation(req.user.id, otherUserId, studentId);
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const send = async (req, res, next) => {
  try {
    const { toUserId, studentId, content } = req.body;
    if (!toUserId || !content?.trim()) {
      return res.status(400).json({ success: false, message: "toUserId and content are required" });
    }

    const message = await service.send({
      fromUserId: req.user.id,
      toUserId,
      studentId:  studentId || null,
      content:    content.trim(),
    });

    // 🔥 Notificación en tiempo real al destinatario
    await createNotification({
      userId:  toUserId,
      title:   "💬 Nuevo mensaje",
      message: `Tienes un nuevo mensaje`,
      type:    "message",
    });

    return res.status(201).json({ success: true, data: message });
  } catch (error) { next(error); }
};