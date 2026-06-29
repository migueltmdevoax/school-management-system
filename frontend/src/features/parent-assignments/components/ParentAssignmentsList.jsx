export default function
ParentAssignmentsList({

  assignments = [],

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

        📝 Tareas

      </h3>





      <div className="
        mt-6
        space-y-4
      ">

        {assignments.map((assignment) => (

          <div

            key={assignment.id}

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

              <h4 className="
                font-semibold
                text-white
              ">

                {assignment.title}

              </h4>





              <span className="
                rounded-full
                bg-indigo-500/20
                px-3
                py-1
                text-xs
                font-bold
                text-indigo-400
              ">

                Fecha limite:
                {" "}
                {assignment.due_date}

              </span>

            </div>





            <p className="
              mt-3
              text-sm
              text-gray-400
            ">

              {assignment.description}

            </p>





            <p className="
              mt-4
              text-xs
              text-gray-500
            ">

              {assignment.first_name}
              {" "}
              {assignment.last_name}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}