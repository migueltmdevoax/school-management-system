import {
  useGetStudentAttendanceQuery,
} from "../attendanceApi";

import AttendanceStatusBadge
from "./AttendanceStatusBadge";

import AttendanceRealtimeBadge
from "./AttendanceRealtimeBadge";

export default function AttendanceLiveFeed({

  studentId,

}) {

  const {

    data,

  } = useGetStudentAttendanceQuery(
    studentId
  );



  const attendance =
    data?.data || [];




  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-950
      p-6
    ">

      <div className="
        mb-6
        flex
        items-center
        justify-between
      ">

        <h3 className="
          text-xl
          font-bold
          text-white
        ">

          Live Attendance

        </h3>





        <AttendanceRealtimeBadge />

      </div>





      <div className="
        space-y-3
      ">

        {attendance.map((item) => (

          <div

            key={item.id}

            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-gray-800
              bg-gray-900/60
              p-4
            "
          >

            <div>

              <p className="
                text-sm
                text-gray-400
              ">

                {item.attendance_date}

              </p>

            </div>





            <AttendanceStatusBadge
              status={item.status}
            />

          </div>

        ))}

      </div>

    </div>

  );

}