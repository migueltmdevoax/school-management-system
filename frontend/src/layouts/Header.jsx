import NotificationsBell
from "../features/notifications-center/components/NotificationsBell";

export default function Header() {

  return (

    <header className="
      flex
      items-center
      justify-between
      border-b
      border-gray-800
      bg-gray-950/80
      px-6
      py-4
      backdrop-blur-xl
    ">

      {/* LEFT */}
      <div>

        <h1 className="
          text-xl
          font-black
          text-white
        ">

          🚀 School SaaS

        </h1>





        <p className="
          text-sm
          text-gray-400
        ">

          Administrative workspace

        </p>

      </div>





      {/* RIGHT */}
      <div className="
        flex
        items-center
        gap-4
      ">

        {/* GLOBAL SEARCH HINT */}
        <div className="
          hidden
          md:flex
          items-center
          rounded-2xl
          border
          border-gray-800
          bg-gray-900
          px-4
          py-2
          text-sm
          text-gray-400
        ">

          ⌘ ⇧ F

        </div>





        {/* NOTIFICATIONS */}
        <NotificationsBell />





        {/* USER */}
        <div className="
          flex
          items-center
          gap-3
          rounded-2xl
          bg-gray-900
          px-4
          py-2
        ">

          <div className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-indigo-500
            font-bold
            text-white
          ">

            A

          </div>





          <div className="
            hidden
            md:block
          ">

            <p className="
              text-sm
              font-semibold
              text-white
            ">

              Admin

            </p>





            <p className="
              text-xs
              text-gray-400
            ">

              Online

            </p>

          </div>

        </div>

      </div>

    </header>

  );

}