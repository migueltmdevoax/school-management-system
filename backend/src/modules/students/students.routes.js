import express from "express";

import {

  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
  bulkDelete,

} from "./students.controller.js";

import {
  getStudentProfile
} from "./students.profile.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";

import {
  authorizeRoles
} from "../../middleware/authorizeRoles.js";

const router =
  express.Router();



/* =========================================
   🎓 STUDENTS
========================================= */

// 🔥 GET STUDENTS
router.get(

  "/",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  getStudents
);


// 🔥 GET STUDENT PROFILE
router.get(

  "/:studentId/profile",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  getStudentProfile
);


// 🔥 CREATE STUDENT
router.post(

  "/",

  verifyToken,

  authorizeRoles(
    "admin"
  ),

  createStudent
);


// 🔥 UPDATE STUDENT
router.put(

  "/:id",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher"
  ),

  updateStudent
);

router.post(

  "/bulk-delete",

  verifyToken,

  authorizeRoles(
    "admin"
  ),

  bulkDelete

);



// 🔥 DELETE STUDENT
router.delete(

  "/:id",

  verifyToken,

  authorizeRoles(
    "admin"
  ),

  deleteStudent
);

export default router;