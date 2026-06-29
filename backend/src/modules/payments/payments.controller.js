import * as paymentsService from "./payments.service.js";
import db from "../../config/db.js";
import { notifyParentsOfPayment } from "../notifications/notifications.service.js";

const resolveParentId = async (user) => {
  if (user.parent_id) return user.parent_id;
  const result = await db.query(
    `SELECT id FROM parents WHERE user_id = $1 LIMIT 1`, [user.id]
  );
  return result.rows[0]?.id || null;
};

export const getAllPayments = async (req, res, next) => {
  try {
    const { role } = req.user;

    if (role === "parent") {
      const parentId = await resolveParentId(req.user);
      if (!parentId) {
        return res.status(404).json({ success: false, message: "Parent not found" });
      }
      const data = await paymentsService.getPaymentsByParent(parentId);
      return res.json({ success: true, data });
    }

    const data = await paymentsService.getAllPayments();
    return res.json({ success: true, data });
  } catch (error) { next(error); }
};

export const createPayment = async (req, res, next) => {
  try {
    const { studentId, amount, dueDate } = req.body;
    if (!studentId || !amount) {
      return res.status(400).json({
        success: false,
        message: "studentId and amount are required",
      });
    }

    const payment = await paymentsService.createPayment({ studentId, amount, dueDate });

    // 🔥 FIX: notifica a parents + admin, e incluye el email
    await notifyParentsOfPayment(studentId, amount);

    return res.status(201).json({ success: true, data: payment });
  } catch (error) { next(error); }
};

export const markAsPaid = async (req, res, next) => {
  try {
    const payment = await paymentsService.markAsPaid(req.params.id);
    return res.json({ success: true, data: payment });
  } catch (error) { next(error); }
};

export const deletePayment = async (req, res, next) => {
  try {
    const payment = await paymentsService.deletePayment(req.params.id);
    return res.json({ success: true, data: payment });
  } catch (error) { next(error); }
};