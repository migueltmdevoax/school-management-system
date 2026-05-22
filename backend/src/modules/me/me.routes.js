import express
from "express";

import {

  getMyDashboard,
  getMyStudents,
  getMyAssignments,
  getMyGrades,
  getMyPayments

} from "./me.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";



const router =
  express.Router();



// 🔥 ALL /me ROUTES REQUIRE AUTH
router.use(
  verifyToken
);



// 🧠 DASHBOARD
router.get(
  "/dashboard",
  getMyDashboard
);



// 👨‍🎓 STUDENTS
router.get(
  "/students",
  getMyStudents
);



// 📚 ASSIGNMENTS
router.get(
  "/assignments",
  getMyAssignments
);



// 📝 GRADES
router.get(
  "/grades",
  getMyGrades
);



// 💳 PAYMENTS
router.get(
  "/payments",
  getMyPayments
);



export default router;