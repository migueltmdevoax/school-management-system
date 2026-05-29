import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

// 🔥 ROUTES

import authRoutes
  from "./modules/auth/auth.routes.js";

import studentRoutes
  from "./modules/students/students.routes.js";

import teacherRoutes
  from "./modules/teachers/teachers.routes.js";

import gradeRoutes
  from "./modules/grades/grades.routes.js";

import assignmentsRoutes
  from "./modules/assignments/assignments.routes.js";

import parentRoutes
  from "./modules/parents/parent.routes.js";

import paymentsRoutes
  from "./modules/payments/payments.routes.js";

import incidentsRoutes
  from "./modules/incidents/incidents.routes.js";

import groupsRoutes
  from "./modules/groups/groups.routes.js";

import meRoutes
  from "./routes/me.routes.js";

import notificationsRoutes
  from "./modules/notifications/notifications.routes.js";

import activityRoutes
  from "./modules/activity/activity.routes.js";

import searchRoutes
from "./modules/search/search.routes.js";

import dashboardRoutes
from "./modules/dashboard/dashboard.routes.js";

import teacherAttendanceRoutes
from "./modules/teacher-attendance/teacherAttendance.routes.js";

import attendanceRoutes
from "./modules/attendance/attendance.routes.js";

import parentPortalRoutes
from "./modules/parent-portal/parentPortal.routes.js";

import parentNotificationsRoutes
from "./modules/parent-notifications/parentNotifications.routes.js";

import parentPaymentsRoutes
from "./modules/parent-payments/parentPayments.routes.js";

import parentAttendanceRoutes
from "./modules/parent-attendance/parentAttendance.routes.js";

import parentIncidentsRoutes
from "./modules/parent-incidents/parentIncidents.routes.js";

import parentGradesRoutes
from "./modules/parent-grades/parentGrades.routes.js";

import parentAssignmentsRoutes
from "./modules/parent-assignments/parentAssignments.routes.js";

import teacherCalendarRoutes
from "./modules/teacher-calendar/teacherCalendar.routes.js";

import academicEventsRoutes
from "./modules/academic-events/academicEvents.routes.js";

const app = express();


// 🟣 GLOBAL MIDDLEWARES

app.use(cors({
  origin: "*",
}));

app.use(express.json());


// 🟣 HEALTH CHECK

app.get("/api/health", (req, res) => {

  return res.status(200).json({
    success: true,
    message:
      "🚀 School SaaS API running"
  });

});


// 🟣 API ROUTES

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/students",
  studentRoutes
);

app.use(
  "/api/teachers",
  teacherRoutes
);

app.use(
  "/api/grades",
  gradeRoutes
);

app.use(
  "/api/assignments",
  assignmentsRoutes
);

app.use(
  "/api/parents",
  parentRoutes
);

app.use(
  "/api/payments",
  paymentsRoutes
);

app.use(
  "/api/incidents",
  incidentsRoutes
);

app.use(
  "/api/groups",
  groupsRoutes
);

app.use(
  "/api/me",
  meRoutes
);

app.use(
  "/api/notifications",
  notificationsRoutes
);

app.use(
  "/api/activity",
  activityRoutes
);

app.use(
  "/api/search",
  searchRoutes
);

app.use(

  "/api/dashboard",

  dashboardRoutes

);

app.use(
  "/api/teacher-attendance",
  teacherAttendanceRoutes
);

app.use(
  "/api/attendance",
  attendanceRoutes
);

app.use(
  "/api/parent-portal",
  parentPortalRoutes
);

app.use(
  "/api/parent-notifications",
  parentNotificationsRoutes
);

app.use(
  "/api/parent-payments",
  parentPaymentsRoutes
);

app.use(
  "/api/parent-attendance",
  parentAttendanceRoutes
);

app.use(
  "/api/parent-incidents",
  parentIncidentsRoutes
);

app.use(
  "/api/parent-grades",
  parentGradesRoutes
);

app.use(
  "/api/parent-assignments",
  parentAssignmentsRoutes
);

app.use(
  "/api/teacher-calendar",
  teacherCalendarRoutes
);

app.use(
  "/api/academic-events",
  academicEventsRoutes
);

// 🟣 404 HANDLER

app.use((req, res) => {

  return res.status(404).json({
    success: false,
    message:
      "Route not found"
  });

});


// 🟣 GLOBAL ERROR HANDLER

app.use((
  err,
  req,
  res,
  next
) => {

  console.error(
    "GLOBAL ERROR:",
    err
  );

  return res.status(500).json({
    success: false,
    message:
      "Internal server error"
  });

});

export default app;