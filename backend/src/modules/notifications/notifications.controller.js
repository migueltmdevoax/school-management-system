import * as notificationsService
from "./notifications.service.js";



// 🔥 GET MY NOTIFICATIONS
export const getMyNotifications =
async (req, res) => {

  try {

    const userId = req.user.id;

    const notifications =
      await notificationsService
        .getUserNotifications(userId);

    return res.status(200).json({

      success: true,

      data: notifications

    });

  } catch (error) {

    console.error(
      "❌ getMyNotifications error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to fetch notifications"

    });
  }
};



// 🔥 MARK AS READ
export const markNotificationAsRead =
async (req, res) => {

  try {

    const { id } = req.params;

    const notification =
      await notificationsService
        .markAsRead(id);

    return res.status(200).json({

      success: true,

      message:
        "Notification marked as read",

      data: notification

    });

  } catch (error) {

    console.error(
      "❌ markNotificationAsRead error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to update notification"

    });
  }
};

// 🔥 CREATE NOTIFICATION
export const createNotification =
async (req, res) => {

  try {

    const notification =
      await notificationsService
        .createNotification({

          userId:
            req.body.user_id,

          title:
            req.body.title,

          message:
            req.body.message

        });

    return res.status(201).json({

      success: true,

      message:
        "Notification created successfully",

      data: notification

    });

  } catch (error) {

    console.error(
      "❌ createNotification error:",
      error
    );

    return res.status(500).json({

      success: false,

      message:
        "Failed to create notification"

    });
  }
};