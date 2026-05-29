import {

  getParentNotifications,

  markParentNotificationRead,

} from "./parentNotifications.service.js";

export const
getParentNotificationsController =
async (req, res) => {

  try {

    const notifications =
      await getParentNotifications(
        req.user.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          notifications,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to get notifications",

      });

  }

};





export const
markParentNotificationReadController =
async (req, res) => {

  try {

    const notification =
      await markParentNotificationRead(
        req.params.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          notification,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to update notification",

      });

  }

};