import * as service from "./payments.service.js";
import { notifyParentsOfPayment } from "../notifications/notifications.service.js";

export async function createPayment(req, res) {
  try {
    const { studentId, amount, dueDate } = req.body;

    const payment = await service.createPayment({
      studentId,
      amount,
      dueDate
    });

    // 🔔 magia aquí
    await notifyParentsOfPayment(studentId, payment.amount);

    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating payment" });
  }
}

export async function getPaymentsByStudent(req, res) {
  try {
    const { id } = req.params;

    const payments = await service.getPaymentsByStudent(id);

    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error fetching payments" });
  }
}

export async function markAsPaid(req, res) {
  try {
    const { id } = req.params;

    const payment = await service.markAsPaid(id);

    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error updating payment" });
  }
}