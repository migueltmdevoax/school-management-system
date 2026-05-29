import {

  getParentChildren,

  getParentDashboard,

} from "./parentPortal.service.js";

export const
getParentChildrenController =
async (req, res) => {

  try {

    const children =
      await getParentChildren(
        req.user.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          children,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to get children",

      });

  }

};





export const
getParentDashboardController =
async (req, res) => {

  try {

    const dashboard =
      await getParentDashboard(
        req.user.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          dashboard,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to load dashboard",

      });

  }

};