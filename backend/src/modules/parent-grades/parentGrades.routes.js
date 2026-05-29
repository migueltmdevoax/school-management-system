import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {
  getParentGradesController,
} from "./parentGrades.controller.js";

const router =
  express.Router();

router.get(
  "/",
  verifyToken,
  getParentGradesController
);

export default router;