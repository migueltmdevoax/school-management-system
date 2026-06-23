import express from "express";
import { verifyToken } from "../../middleware/authJWT.js";
import {
  getMyDashboard,
  getMyStudents,
  getMyGrades,
} from "./me.controller.js";

const router = express.Router();

router.get("/dashboard", verifyToken, getMyDashboard);
router.get("/students",  verifyToken, getMyStudents);
router.get("/grades",    verifyToken, getMyGrades);

export default router;