import express from "express";
import { verifyToken } from "../../middleware/authJWT.js";
import {
  getMyDashboard,
  getMyStudents,
  getMyGrades,
  getMyChildren,
} from "./me.controller.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getMyDashboard);
router.get("/students",  verifyToken, getMyStudents);
router.get("/grades",    verifyToken, getMyGrades);
router.get("/children",  verifyToken, getMyChildren); // 🔥 Nuevo — hijos del parent

export default router; // 🔥 Esta línea faltaba
