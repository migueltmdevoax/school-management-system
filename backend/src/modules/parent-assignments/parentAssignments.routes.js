import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {
  getParentAssignmentsController,
} from "./parentAssignments.controller.js";

const router =
  express.Router();

router.get(
  "/",
  verifyToken,
  getParentAssignmentsController
);

export default router;