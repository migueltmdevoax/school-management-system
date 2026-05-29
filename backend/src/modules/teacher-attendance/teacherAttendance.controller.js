import {

  markTeacherAttendance,

  getTeacherAttendance,

} from "./teacherAttendance.service.js";

export const
markTeacherAttendanceController =
async (req, res) => {

  try {

    const attendance =
      await markTeacherAttendance(
        req.body
      );



    return res.status(201)
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
          "Failed to mark attendance",

      });

  }

};





export const
getTeacherAttendanceController =
async (req, res) => {

  try {

    const attendance =
      await getTeacherAttendance(

        req.params.teacherId

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