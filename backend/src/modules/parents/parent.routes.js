import express from "express";
import { verifyToken } from "../../middleware/authJWT.js";
import { authorizeRoles } from "../../middleware/authorizeRoles.js";
import {
  getDashboard,
  getAllParents,
  getParentById,
} from "./parents.controller.js";

const router = express.Router();

router.get(
  "/dashboard",
  verifyToken,
  authorizeRoles("parent"),
  getDashboard
);

router.get(
  "/",
  verifyToken,
  authorizeRoles("admin"),
  getAllParents
);

router.get(
  "/:id",
  verifyToken,
  authorizeRoles("admin"),
  getParentById
);

export default router;