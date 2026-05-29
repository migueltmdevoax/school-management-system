import {
  getParentGrades,
} from "./parentGrades.service.js";

export const
getParentGradesController =
async (req, res) => {

  try {

    const grades =
      await getParentGrades(
        req.user.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          grades,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to get grades",

      });

  }

};