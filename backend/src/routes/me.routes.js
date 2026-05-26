import express from "express";

const router = express.Router();



// 🔥 MOCK ENDPOINTS TEMPORALES

router.get("/students", async (req, res) => {

  return res.json({
    success: true,
    data: [],
  });

});



router.get("/grades", async (req, res) => {

  return res.json({
    success: true,
    data: [],
  });

});



router.get("/dashboard", async (req, res) => {

  return res.json({
    success: true,
    data: {
      totalStudents: 0,
      riskStudents: 0,
      totalAssignments: 0,
    },
  });

});



export default router;