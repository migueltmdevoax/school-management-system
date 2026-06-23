import { getIO }            from "./socket.js";
import { EVENTS }           from "./events.js";
import { getStudentMetrics } from "../modules/students/students.metrics.service.js";
import { getDashboardMetrics } from "../modules/dashboard/dashboard.service.js";

export const emitToRoom = (room, event, payload) => {
  try {
    const io = getIO();
    io.to(room).emit(event, payload);
  } catch (e) {
    console.warn("emitToRoom:", e.message);
  }
};

export const emitToRole = (role, event, payload) => {
  try {
    const io = getIO();
    io.to(`role:${role}`).emit(event, payload);
  } catch (e) {
    console.warn("emitToRole:", e.message);
  }
};

export const emitToUser = (userId, event, payload) => {
  try {
    const io = getIO();
    io.to(`user:${userId}`).emit(event, payload);
  } catch (e) {
    console.warn("emitToUser:", e.message);
  }
};

export const emitNotificationCreated = (userId, notification) => {
  emitToUser(userId, EVENTS.NOTIFICATION_CREATED, notification);
};

export const emitIncidentCreated = (incident) => {
  emitToRoom(`student:${incident.studentId}`, EVENTS.INCIDENT_CREATED, incident);
  emitToRole("admin", EVENTS.INCIDENT_CREATED, incident);
};

export const emitStudentRiskUpdated = (payload) => {
  emitToRoom(`student:${payload.studentId}`, EVENTS.STUDENT_RISK_UPDATED, payload);
  emitToRole("admin", EVENTS.STUDENT_RISK_UPDATED, payload);
};

export const emitStudentMetricsUpdated = async (studentId) => {
  try {
    const metrics = await getStudentMetrics(studentId);
    emitToRoom(`student:${studentId}`, EVENTS.STUDENT_METRICS_UPDATED, { studentId, metrics });
    emitToRole("admin", EVENTS.STUDENT_METRICS_UPDATED, { studentId, metrics });
  } catch (e) {
    console.warn("emitStudentMetricsUpdated:", e.message);
  }
};

export const emitActivityCreated = (entityType, entityId, activity) => {
  emitToRoom(`${entityType}:${entityId}`, EVENTS.ACTIVITY_CREATED, activity);
  emitToRole("admin", EVENTS.ACTIVITY_CREATED, activity);
};

export const emitDashboardUpdated = async () => {
  try {
    const metrics = await getDashboardMetrics();
    emitToRole("admin", EVENTS.DASHBOARD_UPDATED, metrics);
  } catch (e) {
    console.warn("emitDashboardUpdated:", e.message);
  }
};

export const emitAttendanceUpdated = (studentId, attendance) => {
  try {
    const io = getIO();
    io.emit("attendance:updated", { studentId, attendance });
  } catch (e) {
    console.warn("emitAttendanceUpdated:", e.message);
  }
};