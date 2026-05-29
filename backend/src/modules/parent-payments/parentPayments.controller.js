import {
  getParentPayments,
} from "./parentPayments.service.js";

export const
getParentPaymentsController =
async (req, res) => {

  try {

    const payments =
      await getParentPayments(
        req.user.id
      );



    return res.status(200)
      .json({

        success: true,

        data:
          payments,

      });

  } catch (error) {

    console.error(error);



    return res.status(500)
      .json({

        success: false,

        message:
          "Failed to get payments",

      });

  }

};