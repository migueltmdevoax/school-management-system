export default function
NotificationItem({

  notification,

}) {

  return (

    <div className="
      rounded-2xl
      border
      border-gray-800
      bg-gray-900
      p-4
    ">

      <div className="
        flex
        items-start
        justify-between
        gap-4
      ">

        <div>

          <h3 className="
            font-semibold
            text-white
          ">

            {notification.title}

          </h3>





          <p className="
            mt-1
            text-sm
            text-gray-400
          ">

            {notification.message}

          </p>

        </div>





        <span className="
          text-xs
          text-gray-500
        ">

          now

        </span>

      </div>

    </div>

  );

}