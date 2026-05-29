import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {

  getAcademicEventsController,

  createAcademicEventController,

} from "./academicEvents.controller.js";

const router =
  express.Router();

router.get(
  "/",
  verifyToken,
  getAcademicEventsController
);

router.post(
  "/",
  verifyToken,
  createAcademicEventController
);

export default router;