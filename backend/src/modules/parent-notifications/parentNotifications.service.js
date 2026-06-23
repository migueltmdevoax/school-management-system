import db from "../../config/db.js";

export const getParentNotifications = async (userId) => {
  const { rows } = await db.query(
    `SELECT * FROM notifications
     WHERE user_id = $1
     ORDER BY created_at DESC
     LIMIT 20`,
    [userId]
  );
  return rows;
};

export const markParentNotificationRead = async (notificationId) => {
  const { rows } = await db.query(
    `UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *`,
    [notificationId]
  );
  if (!rows[0]) throw new Error("Notification not found");
  return rows[0];
};