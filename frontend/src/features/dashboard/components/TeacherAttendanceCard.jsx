export default function
TeacherAttendanceCard({

  teachers = [],

}) {

  return (

    <div className="
      rounded-3xl
      border
      border-gray-800
      bg-gray-900/60
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <h3 className="
          text-xl
          font-bold
          text-white
        ">

          👨‍🏫 Teacher Attendance

        </h3>





        <span className="
          text-sm
          text-gray-400
        ">

          Today

        </span>

      </div>





      <div className="
        mt-6
        space-y-4
      ">

        {teachers.map((teacher) => (

          <div

            key={teacher.id}

            className="
              flex
              items-center
              justify-between
              rounded-2xl
              border
              border-gray-800
              bg-gray-950/70
              p-4
            "
          >

            <div>

              <p className="
                font-semibold
                text-white
              ">

                {teacher.first_name}
                {" "}
                {teacher.last_name}

              </p>





              <p className="
                mt-1
                text-sm
                text-gray-400
              ">

                {teacher.status}

              </p>

            </div>





            <div className={`
              rounded-full
              px-3
              py-1
              text-xs
              font-bold

              ${
                teacher.status === "PRESENT"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }
            `}>

              {teacher.status}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}