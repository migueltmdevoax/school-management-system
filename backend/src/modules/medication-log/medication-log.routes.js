import express from "express";
import { getByStudent, getPending, create, authorize, markAdministered }
  from "./medication-log.controller.js";
import { verifyToken }    from "../../middleware/authJWT.js";
import { authorizeRoles } from "../../middleware/authorizeRoles.js";

const router = express.Router();

// 🔥 FIX: parent puede ver pending (para autorizar) y su historial
router.get("/pending",             verifyToken, authorizeRoles("admin", "teacher", "parent"), getPending);
router.get("/student/:studentId",  verifyToken, authorizeRoles("admin", "teacher", "parent"), getByStudent);
router.post("/",                   verifyToken, authorizeRoles("admin", "teacher"), create);
router.put("/:id/authorize",       verifyToken, authorizeRoles("parent"), authorize);
router.put("/:id/administered",    verifyToken, authorizeRoles("admin", "teacher"), markAdministered);

export default router;