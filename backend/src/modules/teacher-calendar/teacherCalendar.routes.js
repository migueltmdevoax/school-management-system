import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {
  getTeacherCalendarController,
} from "./teacherCalendar.controller.js";

const router =
  express.Router();

router.get(
  "/",
  verifyToken,
  getTeacherCalendarController
);

export default router;