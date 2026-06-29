export default function
ParentIncidentsList({

  incidents = [],

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

        🚨 Incidentes

      </h3>





      <div className="
        mt-6
        space-y-4
      ">

        {incidents.map((incident) => (

          <div

            key={incident.id}

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

              <p className="
                font-semibold
                text-white
              ">

                {incident.title}

              </p>





              <span className={`
                rounded-full
                px-3
                py-1
                text-xs
                font-bold

                ${
                  incident.severity === "HIGH"
                    ? "bg-red-500/20 text-red-400"
                    : incident.severity === "MEDIUM"
                    ? "bg-yellow-500/20 text-yellow-400"
                    : "bg-green-500/20 text-green-400"
                }
              `}>

                {incident.severity}

              </span>

            </div>





            <p className="
              mt-3
              text-sm
              text-gray-400
            ">

              {incident.description}

            </p>





            <p className="
              mt-4
              text-xs
              text-gray-500
            ">

              {incident.first_name}
              {" "}
              {incident.last_name}

            </p>

          </div>

        ))}

      </div>

    </div>

  );

}