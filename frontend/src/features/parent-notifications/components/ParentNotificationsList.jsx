export default function
ParentNotificationsList({

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

      <div className="
        flex
        items-center
        justify-between
      ">

        <h3 className="
          text-xl
          font-bold
          text-white
        ">

          🔔 Notifications

        </h3>

      </div>





      <div className="
        mt-6
        space-y-4
      ">

        {notifications.map((notification) => (

          <div

            key={notification.id}

            className={`
              rounded-2xl
              border
              p-4

              ${
                notification.is_read
                  ? "border-gray-800 bg-gray-950/60"
                  : "border-indigo-500/40 bg-indigo-500/10"
              }
            `}
          >

            <div className="
              flex
              items-start
              justify-between
              gap-4
            ">

              <div>

                <h4 className="
                  font-semibold
                  text-white
                ">

                  {notification.title}

                </h4>





                <p className="
                  mt-2
                  text-sm
                  text-gray-300
                ">

                  {notification.message}

                </p>

              </div>





              {!notification.is_read && (

                <span className="
                  rounded-full
                  bg-indigo-500/20
                  px-3
                  py-1
                  text-xs
                  font-bold
                  text-indigo-400
                ">

                  NEW

                </span>

              )}

            </div>





            <div className="
              mt-4
              flex
              items-center
              justify-between
              text-xs
              text-gray-500
            ">

              <span>

                {notification.created_at}

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}