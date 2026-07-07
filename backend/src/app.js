import dotenv from "dotenv";
dotenv.config();

import express    from "express";
import helmet     from "helmet";
import rateLimit  from "express-rate-limit";
import corsMiddleware          from "./config/cors.js";
import { errorMiddleware }     from "./middleware/error.middleware.js";
import { sanitizeInput }       from "./middleware/sanitize.middleware.js";

// ROUTES
import authRoutes              from "./modules/auth/auth.routes.js";
import studentRoutes           from "./modules/students/students.routes.js";
import teacherRoutes           from "./modules/teachers/teachers.routes.js";
import gradeRoutes             from "./modules/grades/grades.routes.js";
import assignmentsRoutes       from "./modules/assignments/assignments.routes.js";
import parentRoutes            from "./modules/parents/parent.routes.js";
import paymentsRoutes          from "./modules/payments/payments.routes.js";
import incidentsRoutes         from "./modules/incidents/incidents.routes.js";
import groupsRoutes            from "./modules/groups/groups.routes.js";
import notificationsRoutes     from "./modules/notifications/notifications.routes.js";
import activityRoutes          from "./modules/activity/activity.routes.js";
import searchRoutes            from "./modules/search/search.routes.js";
import dashboardRoutes         from "./modules/dashboard/dashboard.routes.js";
import teacherAttendanceRoutes from "./modules/teacher-attendance/teacherAttendance.routes.js";
import attendanceRoutes        from "./modules/attendance/attendance.routes.js";
import parentPortalRoutes      from "./modules/parent-portal/parentPortal.routes.js";
import parentNotificationsRoutes from "./modules/parent-notifications/parentNotifications.routes.js";
import parentPaymentsRoutes    from "./modules/parent-payments/parentPayments.routes.js";
import parentAttendanceRoutes  from "./modules/parent-attendance/parentAttendance.routes.js";
import parentIncidentsRoutes   from "./modules/parent-incidents/parentIncidents.routes.js";
import parentGradesRoutes      from "./modules/parent-grades/parentGrades.routes.js";
import parentAssignmentsRoutes from "./modules/parent-assignments/parentAssignments.routes.js";
import teacherCalendarRoutes   from "./modules/teacher-calendar/teacherCalendar.routes.js";
import academicEventsRoutes    from "./modules/academic-events/academicEvents.routes.js";
import meRoutes                from "./modules/me/me.routes.js";

//ROUTES FROM ESTANCIA
import schoolConfigRoutes  from "./modules/school-config/school-config.routes.js";
import allergiesRoutes      from "./modules/allergies/allergies.routes.js";
import dailyReportsRoutes   from "./modules/daily-reports/daily-reports.routes.js";
import pickupControlRoutes  from "./modules/pickup-control/pickup-control.routes.js";
import milestonesRoutes     from "./modules/milestones/milestones.routes.js";
import medicationLogRoutes  from "./modules/medication-log/medication-log.routes.js";
import messagesRoutes       from "./modules/messages/messages.routes.js";

const app = express();

// ============================================================
// 🔒 SECURITY HEADERS
// ============================================================
app.use(helmet({
  crossOriginEmbedderPolicy: false,
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      connectSrc: ["'self'", process.env.FRONTEND_URL || "http://localhost:5173"],
    },
  },
}));

app.use(corsMiddleware);
app.set("trust proxy", 1);

// ============================================================
// 🚦 RATE LIMITING
// ============================================================
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      300,
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, message: "Too many requests, please try again later." },
  skip: (req) => req.path === "/api/health",
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max:      10, // Máximo 10 intentos de login por 15 minutos
  standardHeaders: true,
  legacyHeaders:   false,
  message: { success: false, message: "Too many login attempts. Try again in 15 minutes." },
});

app.use(globalLimiter);

// ============================================================
// 📦 BODY PARSING
// ============================================================
app.use(express.json({ limit: "1mb" })); // Reducido de 10mb — datos escolares no necesitan más
app.use(express.urlencoded({ extended: true, limit: "1mb" }));

// ============================================================
// 🧹 INPUT SANITIZATION — aplica a TODOS los requests
// ============================================================
app.use(sanitizeInput);

// ============================================================
// 🏥 HEALTH CHECK
// ============================================================
app.get("/api/health", (req, res) =>
  res.status(200).json({ success: true, message: "School SaaS API running" })
);

// ============================================================
// 🔐 AUTH (con rate limiting estricto)
// ============================================================
app.use("/api/auth", authLimiter, authRoutes);

// ============================================================
// 🛣️ PROTECTED ROUTES
// ============================================================
app.use("/api/students",              studentRoutes);
app.use("/api/teachers",              teacherRoutes);
app.use("/api/grades",                gradeRoutes);
app.use("/api/assignments",           assignmentsRoutes);
app.use("/api/parents",               parentRoutes);
app.use("/api/payments",              paymentsRoutes);
app.use("/api/incidents",             incidentsRoutes);
app.use("/api/groups",                groupsRoutes);
app.use("/api/notifications",         notificationsRoutes);
app.use("/api/activity",              activityRoutes);
app.use("/api/search",                searchRoutes);
app.use("/api/dashboard",             dashboardRoutes);
app.use("/api/teacher-attendance",    teacherAttendanceRoutes);
app.use("/api/attendance",            attendanceRoutes);
app.use("/api/parent-portal",         parentPortalRoutes);
app.use("/api/parent-notifications",  parentNotificationsRoutes);
app.use("/api/parent-payments",       parentPaymentsRoutes);
app.use("/api/parent-attendance",     parentAttendanceRoutes);
app.use("/api/parent-incidents",      parentIncidentsRoutes);
app.use("/api/parent-grades",         parentGradesRoutes);
app.use("/api/parent-assignments",    parentAssignmentsRoutes);
app.use("/api/teacher-calendar",      teacherCalendarRoutes);
app.use("/api/academic-events",       academicEventsRoutes);
app.use("/api/me",                    meRoutes);
// PROTECTED ROUTES DE ESTANCIA
app.use("/api/school-config",  schoolConfigRoutes);
app.use("/api/allergies",      allergiesRoutes);
app.use("/api/daily-reports",  dailyReportsRoutes);
app.use("/api/pickup-control", pickupControlRoutes);
app.use("/api/milestones",     milestonesRoutes);
app.use("/api/medication-log", medicationLogRoutes);
app.use("/api/messages",       messagesRoutes);

// ============================================================
// 🔍 404
// ============================================================
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" })
);

// ============================================================
// 🚨 GLOBAL ERROR HANDLER
// ============================================================
app.use(errorMiddleware);

export default app;