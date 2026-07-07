import express from "express";
import { getMyConversations, getConversation, send } from "./messages.controller.js";
import { verifyToken }    from "../../middleware/authJWT.js";
import { authorizeRoles } from "../../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/",            verifyToken, authorizeRoles("admin", "teacher", "parent"), getMyConversations);
router.get("/conversation",verifyToken, authorizeRoles("admin", "teacher", "parent"), getConversation);
router.post("/",           verifyToken, authorizeRoles("admin", "teacher", "parent"), send);

export default router;