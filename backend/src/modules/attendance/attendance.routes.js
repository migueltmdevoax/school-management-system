import express        from "express";
import { verifyToken }    from "../../middleware/authJWT.js";
import { authorizeRoles } from "../../middleware/authorizeRoles.js";
import {
  getAttendance,
  markAttendance,
} from "./attendance.controller.js";

const router = express.Router();

router.get("/",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  getAttendance
);

router.post("/",
  verifyToken,
  authorizeRoles("teacher"),
  markAttendance
);

export default router;