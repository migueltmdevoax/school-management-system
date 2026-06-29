export default function
ParentAttendanceTable({

  attendance = [],

}) {

  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-900/60
      p-6
      overflow-x-auto
    ">

      <h3 className="
        text-xl
        font-bold
        text-white
      ">

        📅 Asistencia del alumno

      </h3>





      <table className="
        mt-6
        w-full
        min-w-[700px]
      ">

        <thead>

          <tr className="
            border-b
            border-gray-800
            text-left
          ">

            <th className="
              pb-4
              text-gray-400
            ">

              Estudiante

            </th>





            <th className="
              pb-4
              text-gray-400
            ">

              Estado

            </th>





            <th className="
              pb-4
              text-gray-400
            ">

              Fecha

            </th>

          </tr>

        </thead>





        <tbody>

          {attendance.map((item) => (

            <tr

              key={item.id}

              className="
                border-b
                border-gray-900
              "
            >

              <td className="
                py-4
                text-white
              ">

                {item.first_name}
                {" "}
                {item.last_name}

              </td>





              <td className="
                py-4
              ">

                <span className={`
                  rounded-full
                  px-3
                  py-1
                  text-xs
                  font-bold

                  ${
                    item.status === "PRESENT"
                      ? "bg-green-500/20 text-green-400"
                      : item.status === "LATE"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }
                `}>

                  {item.status}

                </span>

              </td>





              <td className="
                py-4
                text-gray-400
              ">

                {item.attendance_date}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}