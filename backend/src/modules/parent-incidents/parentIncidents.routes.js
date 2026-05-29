import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {
  getParentIncidentsController,
} from "./parentIncidents.controller.js";

const router =
  express.Router();

router.get(
  "/",
  verifyToken,
  getParentIncidentsController
);

export default router;