export default function
ParentGradesTable({

  grades = [],

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

        📘 Calificaciones

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

              Materia

            </th>





            <th className="
              pb-4
              text-gray-400
            ">

              Calificacion

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

          {grades.map((grade) => (

            <tr

              key={grade.id}

              className="
                border-b
                border-gray-900
              "
            >

              <td className="
                py-4
                text-white
              ">

                {grade.first_name}
                {" "}
                {grade.last_name}

              </td>





              <td className="
                py-4
                text-gray-300
              ">

                {grade.subject}

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
                    grade.grade >= 90
                      ? "bg-green-500/20 text-green-400"
                      : grade.grade >= 70
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }
                `}>

                  {grade.grade}

                </span>

              </td>





              <td className="
                py-4
                text-gray-400
              ">

                {grade.created_at}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}