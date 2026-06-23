import express from "express";
import {
  createGrade,
  getAllGrades,
  getGradesByAssignmentStudent,
  createGradeByAssignmentAndStudent,
} from "./grades.controller.js";
import { verifyToken }     from "../../middleware/authJWT.js";
import { authorizeRoles }  from "../../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/",
  verifyToken,
  authorizeRoles("admin","teacher","parent"),
  getAllGrades
);

router.get("/:assignment_student_id",
  verifyToken,
  authorizeRoles("admin","teacher","parent"),
  getGradesByAssignmentStudent
);

router.post("/",
  verifyToken,
  authorizeRoles("teacher","admin"),
  createGrade
);

// Nuevo endpoint — recibe assignment_id + student_id directamente
router.post("/assignment-student",
  verifyToken,
  authorizeRoles("teacher","admin"),
  createGradeByAssignmentAndStudent
);

export default router;