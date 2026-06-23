import express        from "express";
import { verifyToken }    from "../../middleware/authJWT.js";
import { authorizeRoles } from "../../middleware/authorizeRoles.js";
import { validateUUID }   from "../../middleware/sanitize.middleware.js";
import {
  getAllPayments,
  createPayment,
  markAsPaid,
  deletePayment,
} from "./payments.controller.js";

const router = express.Router();

// 🔥 Parent puede ver sus pagos
router.get("/",
  verifyToken,
  authorizeRoles("admin", "parent"),
  getAllPayments
);

router.post("/",
  verifyToken,
  authorizeRoles("admin"),
  createPayment
);

router.patch("/:id/pay",
  verifyToken,
  authorizeRoles("admin"),
  validateUUID("id"),
  markAsPaid
);

router.delete("/:id",
  verifyToken,
  authorizeRoles("admin"),
  validateUUID("id"),
  deletePayment
);

export default router;