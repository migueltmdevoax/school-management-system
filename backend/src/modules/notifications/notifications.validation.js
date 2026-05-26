export function validateCreateNotification(
  req,
  res,
  next
) {

  const {

    user_id,
    title,
    message

  } = req.body;



  // 🔥 REQUIRED
  if (
    !user_id ||
    !title
  ) {

    return res.status(400).json({

      success: false,

      message:
        "user_id and title are required"

    });
  }



  // 🔥 TITLE LENGTH
  if (title.length > 255) {

    return res.status(400).json({

      success: false,

      message:
        "Title is too long"

    });
  }



  // 🔥 MESSAGE TYPE
  if (
    message &&
    typeof message !== "string"
  ) {

    return res.status(400).json({

      success: false,

      message:
        "Message must be a string"

    });
  }



  next();
}