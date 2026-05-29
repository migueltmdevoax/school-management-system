import {
  getDashboardMetrics,
} from "./dashboard.service.js";

export const getDashboard =
async (req, res) => {

  try {

    const metrics =

      await getDashboardMetrics();




    return res.status(200).json({

      success: true,

      data: metrics,

    });

  } catch (error) {

    console.error(error);




    return res.status(500).json({

      success: false,

      message:
        "Failed to load dashboard",

    });

  }

};