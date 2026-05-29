import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {
  markTeacherAttendanceController,
  getTeacherAttendanceController,
} from "./teacherAttendance.controller.js";

const router =
  express.Router();

router.post(
  "/",
  verifyToken,
  markTeacherAttendanceController
);

router.get(
  "/teacher/:teacherId",
  verifyToken,
  getTeacherAttendanceController
);

export default router;