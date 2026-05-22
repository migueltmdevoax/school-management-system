import express from "express";

import {

  createGrade,
  getAllGrades,
  getGradesByAssignmentStudent

} from "./grades.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";

import {
  authorizeRoles
} from "../../middleware/authorizeRoles.js";

const router =
  express.Router();



/* =========================================
   📊 GRADES
========================================= */

// 🔥 GET ALL
router.get(

  "/",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  getAllGrades
);


// 🔥 GET BY ASSIGNMENT STUDENT
router.get(

  "/:assignment_student_id",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  getGradesByAssignmentStudent
);


// 🔥 CREATE GRADE
router.post(

  "/",

  verifyToken,

  authorizeRoles(
    "teacher",
    "admin"
  ),

  createGrade
);

export default router;