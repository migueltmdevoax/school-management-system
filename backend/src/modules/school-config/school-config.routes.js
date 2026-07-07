import express from "express";
import { getConfig, updateConfig } from "./school-config.controller.js";
import { verifyToken }       from "../../middleware/authJWT.js";
import { authorizeRoles }    from "../../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/",     verifyToken, authorizeRoles("admin", "teacher", "parent"), getConfig);
router.put("/:id",  verifyToken, authorizeRoles("admin"), updateConfig);

export default router;