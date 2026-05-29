import express
from "express";

import {
  verifyToken,
} from "../../middleware/authJWT.js";

import {

  getParentNotificationsController,

  markParentNotificationReadController,

} from "./parentNotifications.controller.js";

const router =
  express.Router();

router.get(
  "/",
  verifyToken,
  getParentNotificationsController
);

router.patch(
  "/:id/read",
  verifyToken,
  markParentNotificationReadController
);

export default router;