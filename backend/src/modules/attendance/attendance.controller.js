import {

  markAttendance,

  getAttendanceByStudent,

} from "./attendance.service.js";



// 🟣 CREATE
export const markAttendanceController =
async (req, res) => {

  try {

    const attendance =
      await markAttendance({

        ...req.body,

        createdBy:
          req.user.id,

      });



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
          "Attendance creation failed",

      });

  }

};




// 🟣 GET BY STUDENT
export const getAttendanceByStudentController =
async (req, res) => {

  try {

    const data =
      await getAttendanceByStudent(
        req.params.studentId
      );



    return res.status(200)
      .json({

        success: true,

        data,

      });

  } catch (error) {

    console.error(error);

    return res.status(500)
      .json({

        success: false,

        message:
          "Attendance fetch failed",

      });

  }

};