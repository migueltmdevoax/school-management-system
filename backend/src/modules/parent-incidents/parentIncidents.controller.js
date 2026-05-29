import {
  getParentIncidents,
} from "./parentIncidents.service.js";

export const
getParentIncidentsController =
async (req, res) => {

  try {

    const incidents =
      await getParentIncidents(
        req.user.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          incidents,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to get incidents",

      });

  }

};