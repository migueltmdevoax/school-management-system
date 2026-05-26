import express
from "express";

import {

  getMyNotifications,
  markNotificationAsRead,
  createNotification

} from "./notifications.controller.js";

import {

  validateCreateNotification

} from "./notifications.validation.js";

import {
  verifyToken
} from "../../middleware/authJWT.js";



const router =
  express.Router();



// 🔥 GET MY NOTIFICATIONS
router.get(

  "/my-notifications",

  verifyToken,

  getMyNotifications
);



// 🔥 MARK AS READ
router.put(

  "/:id/read",

  verifyToken,

  markNotificationAsRead
);



// 🔥 CREATE NOTIFICATION
router.post(

  "/",

  verifyToken,

  validateCreateNotification,

  createNotification
);



export default router;