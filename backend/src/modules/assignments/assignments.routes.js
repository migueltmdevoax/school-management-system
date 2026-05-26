import express
from "express";

import {

  getAssignments,
  getMyAssignments,
  getAssignmentById,
  createAssignment,
  updateAssignment,
  deleteAssignment,

  createSubmission,
  gradeSubmission

} from "./assignments.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";

import {
  authorizeRoles
} from "../../middleware/authorizeRoles.js";

const router =
  express.Router();



/* ==================================================
   📚 ASSIGNMENTS
================================================== */

// 🔥 GET ALL ASSIGNMENTS
router.get(

  "/",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  getAssignments
);

router.get(

  "/my-assignments",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  getMyAssignments
);


// 🔥 GET SINGLE ASSIGNMENT
router.get(

  "/:id",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  getAssignmentById
);


// 🔥 CREATE ASSIGNMENT
router.post(

  "/",

  verifyToken,

  authorizeRoles(
    "teacher",
    "admin"
  ),

  createAssignment
);


// 🔥 UPDATE ASSIGNMENT
router.put(

  "/:id",

  verifyToken,

  authorizeRoles(
    "teacher",
    "admin"
  ),

  updateAssignment
);


// 🔥 DELETE ASSIGNMENT
router.delete(

  "/:id",

  verifyToken,

  authorizeRoles(
    "teacher",
    "admin"
  ),

  deleteAssignment
);





/* ==================================================
   📝 SUBMISSIONS
================================================== */

// 🔥 CREATE SUBMISSION
router.post(

  "/submissions",

  verifyToken,

  authorizeRoles(
    "student",
    "parent"
  ),

  createSubmission
);


// 🔥 GRADE SUBMISSION
router.put(

  "/submissions/:id/grade",

  verifyToken,

  authorizeRoles(
    "teacher",
    "admin"
  ),

  gradeSubmission
);



export default router;