import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {

  getParentPaymentsController,

} from "./parentPayments.controller.js";

const router =
  express.Router();

router.get(
  "/",
  verifyToken,
  getParentPaymentsController
);

export default router;