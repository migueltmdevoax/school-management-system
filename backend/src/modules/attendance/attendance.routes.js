import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {

  markAttendanceController,

  getAttendanceByStudentController,

} from "./attendance.controller.js";

const router =
  express.Router();




// 🟣 CREATE
router.post(

  "/",

  verifyToken,

  markAttendanceController

);




// 🟣 GET STUDENT ATTENDANCE
router.get(

  "/student/:studentId",

  verifyToken,

  getAttendanceByStudentController

);

export default router;