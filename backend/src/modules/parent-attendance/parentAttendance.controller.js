import {
  getParentAttendance,
} from "./parentAttendance.service.js";

export const
getParentAttendanceController =
async (req, res) => {

  try {

    const attendance =
      await getParentAttendance(
        req.user.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          attendance,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to get attendance",

      });

  }

};