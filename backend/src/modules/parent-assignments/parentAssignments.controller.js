import {
  getParentAssignments,
} from "./parentAssignments.service.js";

export const
getParentAssignmentsController =
async (req, res) => {

  try {

    const assignments =
      await getParentAssignments(
        req.user.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          assignments,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to get assignments",

      });

  }

};