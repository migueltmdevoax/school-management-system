import express from "express";

import teacherController
from "./teachers.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";

import {
  authorizeRoles
} from "../../middleware/authorizeRoles.js";

const router =
  express.Router();



/* =========================================
   👨‍🏫 TEACHERS
========================================= */

// 🔥 GET ALL TEACHERS
router.get(

  "/",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher"
  ),

  teacherController.getAllTeachers
);


// 🔥 GET TEACHER BY ID
router.get(

  "/:id",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher"
  ),

  teacherController.getTeacherById
);


// 🔥 CREATE TEACHER
router.post(

  "/",

  verifyToken,

  authorizeRoles(
    "admin"
  ),

  teacherController.createTeacher
);


// 🔥 UPDATE TEACHER
router.put(

  "/:id",

  verifyToken,

  authorizeRoles(
    "admin"
  ),

  teacherController.updateTeacher
);


// 🔥 DELETE TEACHER
router.delete(

  "/:id",

  verifyToken,

  authorizeRoles(
    "admin"
  ),

  teacherController.deleteTeacher
);

export default router;