// parent.controller.js
import * as service from "./parents.service.js";

export async function getDashboard(
  req,
  res
) {

  try {

    const parentId =
      req.user.parent_id;

    const data =
      await service
        .getParentDashboard(
          parentId
        );

    res.json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({

      error:
        "Error fetching dashboard"

    });
  }
}
