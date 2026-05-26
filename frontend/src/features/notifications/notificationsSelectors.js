export const selectUnreadNotificationsCount =
(notifications = []) => {

  return notifications.filter(

    notification =>

      !notification.is_read

  ).length;
};





export const selectLatestNotifications =
(

  notifications = [],

  limit = 5

) => {

  return notifications.slice(
    0,
    limit
  );
};





export const selectUnreadNotifications =
(notifications = []) => {

  return notifications.filter(

    notification =>

      !notification.is_read
  );
};