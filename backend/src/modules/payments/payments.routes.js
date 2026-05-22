import express
from "express";

import * as controller
from "./payments.controller.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";

import {
  authorizeRoles
} from "../../middleware/authorizeRoles.js";

const router =
  express.Router();



/* =========================================
   💳 PAYMENTS
========================================= */

// 🔥 CREATE PAYMENT
router.post(

  "/",

  verifyToken,

  authorizeRoles(
    "admin"
  ),

  controller.createPayment
);


// 🔥 GET PAYMENTS
router.get(

  "/student/:id",

  verifyToken,

  authorizeRoles(
    "admin",
    "teacher",
    "parent"
  ),

  controller.getPaymentsByStudent
);


// 🔥 MARK AS PAID
router.patch(

  "/:id/pay",

  verifyToken,

  authorizeRoles(
    "admin",
    "parent"
  ),

  controller.markAsPaid
);

export default router;