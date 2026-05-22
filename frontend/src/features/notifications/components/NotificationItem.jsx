export default function NotificationItem({

  notification,

}) {

  const date =
    new Date(
      notification.createdAt
    );



  return (

    <div className="
      border-b
      border-gray-800
      p-4
      hover:bg-gray-900
      transition-all
      cursor-pointer
    ">

      {/* 🟣 TOP */}
      <div className="
        flex
        items-start
        justify-between
        gap-4
      ">

        <div>

          <h3 className="
            text-white
            font-semibold
          ">

            {notification.title}

          </h3>





          <p className="
            text-gray-400
            text-sm
            mt-1
          ">

            {notification.message}

          </p>

        </div>





        {!notification.read && (

          <div className="
            w-2
            h-2
            rounded-full
            bg-blue-500
            mt-2
          " />
        )}

      </div>





      {/* 🟣 TIME */}
      <p className="
        text-xs
        text-gray-500
        mt-3
      ">

        {date.toLocaleTimeString()}

      </p>

    </div>
  );
}