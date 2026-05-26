import express
from "express";

import {
  getGroups
} from "./groups.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";

import {
  authorizeRoles
} from "../../middleware/authorizeRoles.js";

const router =
  express.Router();



// 🔥 GET GROUPS
router.get(

  "/",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  getGroups
);

export default router;