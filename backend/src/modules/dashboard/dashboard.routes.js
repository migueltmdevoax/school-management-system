import express
from "express";

import {
  getDashboard,
} from "./dashboard.controller.js";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

const router =
  express.Router();

router.get(

  "/",

  verifyToken,

  getDashboard

);

export default router;