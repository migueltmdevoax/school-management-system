import AttendanceMiniBar
from "./AttendanceMiniBar";

import AttendanceStatCard
from "./AttendanceStatCard";

export default function AttendanceOverviewCard({

  overview,

}) {

  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-900/70
      backdrop-blur-xl
      p-6
      shadow-2xl
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <h2 className="
          text-xl
          font-bold
          text-white
        ">

          Attendance Overview

        </h2>





        <div className="
          rounded-2xl
          bg-green-500/20
          px-4
          py-2
          text-sm
          font-semibold
          text-green-400
        ">

          {overview.attendanceRate}%

        </div>

      </div>





      <AttendanceMiniBar
        percentage={
          overview.attendanceRate
        }
      />





      <div className="
        mt-6
        grid
        grid-cols-3
        gap-4
      ">

        <AttendanceStatCard
          label="Present"
          value={overview.present}
          icon="✅"
        />





        <AttendanceStatCard
          label="Absent"
          value={overview.absent}
          icon="❌"
        />





        <AttendanceStatCard
          label="Total"
          value={overview.total}
          icon="📚"
        />

      </div>

    </div>

  );

}