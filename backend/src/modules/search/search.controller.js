import {
  globalSearch
} from "./search.service.js";

export const searchController =
async (req, res) => {

  try {

    const {
      q
    } = req.query;



    if (!q) {

      return res.status(400)
        .json({

          success: false,

          message:
            "Search query required",

        });

    }



    const results =
      await globalSearch(q);



    return res.status(200)
      .json({

        success: true,

        data:
          results,

      });

  } catch (error) {

    console.error(error);

    return res.status(500)
      .json({

        success: false,

        message:
          "Search failed",

      });

  }

};