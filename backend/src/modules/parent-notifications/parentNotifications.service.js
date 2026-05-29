import db from "../../config/db.js";

export const
getParentNotifications =
async (parentId) => {

  const result =
    await db.query(

      `
      SELECT *

      FROM notifications

      WHERE user_id = $1

      ORDER BY created_at DESC

      LIMIT 20
      `,

      [parentId]

    );



  return result.rows;

};





export const
markParentNotificationRead =
async (notificationId) => {

  const result =
    await db.query(

      `
      UPDATE notifications

      SET
        is_read = true

      WHERE id = $1

      RETURNING *
      `,

      [notificationId]

    );



  return result.rows[0];

};