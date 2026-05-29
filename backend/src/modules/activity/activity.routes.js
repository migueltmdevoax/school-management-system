import express from "express";

import {
  getEntityActivity
} from "./activity.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";

const router =
  express.Router();

router.get(

  "/:entityType/:entityId",

  verifyToken,

  getEntityActivity

);

export default router;