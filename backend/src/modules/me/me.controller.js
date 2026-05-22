import * as meService
from "./me.service.js";



// 🧠 DASHBOARD
export const getMyDashboard =
async (req, res) => {

  try {

    const data =
      await meService.getDashboard(
        req.user
      );

    return res.json({

      success: true,

      data

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });
  }
};



// 👨‍🎓 STUDENTS
export const getMyStudents =
async (req, res) => {

  try {

    const students =
      await meService.getStudents(
        req.user
      );

    return res.json({

      success: true,

      data: students

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });
  }
};



// 📚 ASSIGNMENTS
export const getMyAssignments =
async (req, res) => {

  try {

    const assignments =
      await meService.getAssignments(
        req.user
      );

    return res.json({

      success: true,

      data: assignments

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });
  }
};



// 📝 GRADES
export const getMyGrades =
async (req, res) => {

  try {

    const grades =
      await meService.getGrades(
        req.user
      );

    return res.json({

      success: true,

      data: grades

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });
  }
};



// 💳 PAYMENTS
export const getMyPayments =
async (req, res) => {

  try {

    const payments =
      await meService.getPayments(
        req.user
      );

    return res.json({

      success: true,

      data: payments

    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({

      success: false,

      message: error.message

    });
  }
};