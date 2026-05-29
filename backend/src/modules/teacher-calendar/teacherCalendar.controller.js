import {
  getTeacherCalendar,
} from "./teacherCalendar.service.js";

export const
getTeacherCalendarController =
async (req, res) => {

  try {

    const events =
      await getTeacherCalendar(
        req.user.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          events,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to get calendar",

      });

  }

};