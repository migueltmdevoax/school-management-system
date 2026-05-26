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

import meRoutes from "./routes/me.routes.js";

import notificationsRoutes
from "./modules/notifications/notifications.routes.js";


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

app.use("/api/me", meRoutes);

app.use(
  "/api/notifications",
  notificationsRoutes
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