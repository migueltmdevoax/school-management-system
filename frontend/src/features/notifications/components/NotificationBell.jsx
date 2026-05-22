import {
  useState,
} from "react";

import {
  useAppSelector,
} from "../../../hooks/useAppSelector";

import NotificationDropdown
from "./NotificationDropdown";



export default function NotificationBell() {

  const [

    open,

    setOpen,

  ] = useState(false);




  const notifications =

    useAppSelector(

      (state) =>

        state.notifications
          .notifications
    );




  const unreadCount =

    notifications.filter(

      notification =>
        !notification.read
    ).length;





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



        {/* 🟣 BADGE */}
        {unreadCount > 0 && (

          <span className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            text-xs
            font-bold
            min-w-[22px]
            h-[22px]
            px-1
            rounded-full
            flex
            items-center
            justify-center
            animate-pulse
          ">

            {unreadCount}

          </span>
        )}

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