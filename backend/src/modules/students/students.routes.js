import express from "express";
import {
  getStudents, createStudent, updateStudent,
  deleteStudent, bulkDelete,
} from "./students.controller.js";
import { getStudentProfile }  from "./students.profile.controller.js";
import { verifyToken }        from "../../middleware/authJWT.js";
import { authorizeRoles }     from "../../middleware/authorizeRoles.js";
import { validateUUID }       from "../../middleware/sanitize.middleware.js";

const router = express.Router();

router.get("/",
  verifyToken,
  authorizeRoles("admin","teacher","parent"),
  getStudents
);

router.get("/:studentId/profile",
  verifyToken,
  authorizeRoles("admin","teacher","parent"),
  validateUUID("studentId"),
  getStudentProfile
);

router.post("/",
  verifyToken,
  authorizeRoles("admin"),
  createStudent
);

router.put("/:id",
  verifyToken,
  authorizeRoles("admin","teacher"),
  validateUUID("id"),
  updateStudent
);

router.post("/bulk-delete",
  verifyToken,
  authorizeRoles("admin"),
  bulkDelete
);

router.delete("/:id",
  verifyToken,
  authorizeRoles("admin"),
  validateUUID("id"),
  deleteStudent
);

export default router;