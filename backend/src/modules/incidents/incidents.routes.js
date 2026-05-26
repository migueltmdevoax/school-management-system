import { Router }
from "express";

import * as controller
from "./incidents.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";

import {
  authorizeRoles
} from "../../middleware/authorizeRoles.js";

const router =
  Router();



/* =========================================
   🚨 INCIDENTS
========================================= */

// 🔥 CREATE INCIDENT
router.post(

  "/",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher"
  ),

  controller.createIncident
);


// 🔥 GET INCIDENTS BY STUDENT
router.get(

  "/:id",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  controller.getIncidentsByStudent
);

export default router;