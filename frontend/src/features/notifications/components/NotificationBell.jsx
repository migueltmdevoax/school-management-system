import {
  useState,
} from "react";

import {

  useGetMyNotificationsQuery,

} from "../notificationsApi";

import NotificationDropdown
from "./NotificationDropdown";

import UnreadBadge
from "./UnreadBadge";

import {

  selectUnreadNotificationsCount,

} from "../notificationsSelectors";



export default function NotificationBell() {

  const [

    open,

    setOpen,

  ] = useState(false);




  // 🔥 RTK QUERY
  const {

    data: notifications = [],

  } = useGetMyNotificationsQuery();





  const unreadCount =

    selectUnreadNotificationsCount(
      notifications
    );





  return (

    <div className="
      relative
    ">

      {/* 🔔 BUTTON */}
      <button

        onClick={() =>
          setOpen(!open)
        }

        className="
          relative
          bg-gray-900
          hover:bg-gray-800
          border
          border-gray-800
          transition-all
          rounded-xl
          p-3
        "
      >

        🔔



        {/* 🔥 NEW BADGE COMPONENT */}
        <UnreadBadge
          count={unreadCount}
        />

      </button>





      {/* 🟣 DROPDOWN */}
      {open && (

        <NotificationDropdown

          notifications={
            notifications
          }
        />
      )}

    </div>
  );
}