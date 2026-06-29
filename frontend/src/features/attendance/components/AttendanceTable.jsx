import AttendanceStatusBadge
from "./AttendanceStatusBadge";

export default function AttendanceTable({

  data = [],

}) {

  return (

    <div className="
      overflow-hidden
      rounded-3xl
      border
      border-gray-800
    ">

      <table className="
        w-full
      ">

        <thead className="
          bg-gray-900
        ">

          <tr>

            <th className="
              p-4
              text-left
            ">
              Fecha
            </th>

            <th className="
              p-4
              text-left
            ">
              Estado
            </th>

          </tr>

        </thead>





        <tbody>

          {data.map((item) => (

            <tr
              key={item.id}
              className="
                border-t
                border-gray-800
              "
            >

              <td className="
                p-4
                text-gray-300
              ">

                {item.attendance_date}

              </td>





              <td className="
                p-4
              ">

                <AttendanceStatusBadge
                  status={item.status}
                />

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}