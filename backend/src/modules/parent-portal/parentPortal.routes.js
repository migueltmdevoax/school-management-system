import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {

  getParentChildrenController,

  getParentDashboardController,

} from "./parentPortal.controller.js";

const router =
  express.Router();

router.get(
  "/children",
  verifyToken,
  getParentChildrenController
);

router.get(
  "/dashboard",
  verifyToken,
  getParentDashboardController
);

export default router;