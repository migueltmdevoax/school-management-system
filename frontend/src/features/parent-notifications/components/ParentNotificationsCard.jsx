export default function
ParentNotificationsCard({

  notifications = [],

}) {

  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-900/60
      p-6
    ">

      <h3 className="
        text-xl
        font-bold
        text-white
      ">

        🔔 Notifications

      </h3>





      <div className="
        mt-6
        space-y-4
      ">

        {notifications.map((notification) => (

          <div

            key={notification.id}

            className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-950/70
              p-4
            "
          >

            <p className="
              font-semibold
              text-white
            ">

              {notification.title}

            </p>





            <p className="
              mt-1
              text-sm
              text-gray-400
            ">

              {notification.message}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}