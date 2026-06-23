export const selectUnreadNotificationsCount = (notifications) => {
  if (!Array.isArray(notifications)) return 0;
  return notifications.filter((n) => !n.is_read).length;
};

export const selectLatestNotifications = (notifications, limit = 5) => {
  if (!Array.isArray(notifications)) return [];
  return notifications.slice(0, limit);
};

export const selectUnreadNotifications = (notifications) => {
  if (!Array.isArray(notifications)) return [];
  return notifications.filter((n) => !n.is_read);
};