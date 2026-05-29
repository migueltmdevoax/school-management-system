export default function
TeacherAttendanceSummary({

  summary,

}) {

  return (

    <div className="
      grid
      grid-cols-1
      md:grid-cols-3
      gap-6
    ">

      <div className="
        rounded-3xl
        border
        border-gray-800
        bg-gray-900/60
        p-6
      ">

        <p className="
          text-sm
          text-gray-400
        ">

          Present

        </p>





        <h2 className="
          mt-2
          text-4xl
          font-black
          text-green-400
        ">

          {summary.present}

        </h2>

      </div>





      <div className="
        rounded-3xl
        border
        border-gray-800
        bg-gray-900/60
        p-6
      ">

        <p className="
          text-sm
          text-gray-400
        ">

          Absent

        </p>





        <h2 className="
          mt-2
          text-4xl
          font-black
          text-red-400
        ">

          {summary.absent}

        </h2>

      </div>





      <div className="
        rounded-3xl
        border
        border-gray-800
        bg-gray-900/60
        p-6
      ">

        <p className="
          text-sm
          text-gray-400
        ">

          Attendance Rate

        </p>





        <h2 className="
          mt-2
          text-4xl
          font-black
          text-indigo-400
        ">

          {summary.rate}%

        </h2>

      </div>

    </div>

  );

}