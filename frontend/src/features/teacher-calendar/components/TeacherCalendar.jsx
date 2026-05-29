export default function
TeacherCalendar({

  events = [],

}) {

  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-900/60
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        text-white
      ">

        📅 Teacher Calendar

      </h2>





      <div className="
        mt-6
        space-y-4
      ">

        {events.map((event) => (

          <div

            key={event.id}

            className="
              rounded-2xl
              border
              border-gray-800
              bg-gray-950/70
              p-4
            "
          >

            <div className="
              flex
              items-center
              justify-between
            ">

              <h3 className="
                font-semibold
                text-white
              ">

                {event.title}

              </h3>





              <span className="
                rounded-full
                bg-indigo-500/20
                px-3
                py-1
                text-xs
                font-bold
                text-indigo-400
              ">

                {event.type}

              </span>

            </div>





            <div className="
              mt-4
              flex
              gap-6
              text-sm
              text-gray-400
            ">

              <span>

                Start:
                {" "}
                {event.start_date}

              </span>





              <span>

                End:
                {" "}
                {event.end_date}

              </span>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}