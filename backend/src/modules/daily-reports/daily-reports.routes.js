import express from "express";
import { getByStudent, getByDate, create } from "./daily-reports.controller.js";
import { verifyToken }    from "../../middleware/authJWT.js";
import { authorizeRoles } from "../../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/",                      verifyToken, authorizeRoles("admin", "teacher"), getByDate);
router.get("/student/:studentId",    verifyToken, authorizeRoles("admin", "teacher", "parent"), getByStudent);
router.post("/",                     verifyToken, authorizeRoles("admin", "teacher"), create);

export default router;