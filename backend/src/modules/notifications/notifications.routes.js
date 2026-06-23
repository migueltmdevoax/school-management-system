import { Router }         from "express";
import { verifyToken }    from "../../middleware/authJWT.js";
import { authorizeRoles } from "../../middleware/authorizeRoles.js";
import {
  getMyNotifications,
  markNotificationAsRead,
  markAllAsRead,
  createNotification,
} from "./notifications.controller.js";

const router = Router();

router.get("/my-notifications",
  verifyToken,
  authorizeRoles("admin","teacher","parent"),
  getMyNotifications
);

router.put("/:id/read",
  verifyToken,
  authorizeRoles("admin","teacher","parent"),
  markNotificationAsRead
);

// 🔥 Nuevo endpoint — marca todas como leídas
router.put("/read-all",
  verifyToken,
  authorizeRoles("admin","teacher","parent"),
  markAllAsRead
);

router.post("/",
  verifyToken,
  authorizeRoles("admin"),
  createNotification
);

export default router;