import express
from "express";

import * as controller
from "./parents.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";

import {
  authorizeRoles
} from "../../middleware/authorizeRoles.js";

const router =
  express.Router();



// 🔥 PARENT DASHBOARD
router.get(

  "/dashboard",

  verifyToken,

  authorizeRoles(
    "parent"
  ),

  controller.getDashboard
);

export default router;