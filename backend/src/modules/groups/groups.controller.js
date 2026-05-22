import * as groupsService
from "./groups.service.js";



export const getGroups =
  async (req, res) => {

    try {

      const groups =
        await groupsService
          .getAllGroups();

      return res.status(200).json({

        success: true,

        data: groups

      });

    } catch (error) {

      console.error(
        "❌ getGroups error:",
        error
      );

      return res.status(500).json({

        success: false,

        message:
          "Failed to fetch groups"

      });
    }
  };