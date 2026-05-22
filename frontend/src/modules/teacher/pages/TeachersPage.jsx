import {

  useGetTeachersQuery,
  useDeleteTeacherMutation

} from "../../../features/teachers/api/teachersApi";


export default function TeachersPage() {

  const {

    data,
    isLoading,
    isError

  } = useGetTeachersQuery();

  const [
    deleteTeacher
  ] =
    useDeleteTeacherMutation();


  // 🔥 STATES
  if (isLoading) {

    return (

      <div className="
        p-10
        text-white
      ">
        Loading teachers...
      </div>

    );

  }

  if (isError) {

    return (

      <div className="
        p-10
        text-red-400
      ">
        Error loading teachers
      </div>

    );

  }

  const teachers =
    data?.data || [];

  return (

    <div className="
      p-6
      space-y-6
    ">

      {/* 🔥 HEADER */}
      <div>

        <h1 className="
          text-3xl
          font-bold
          text-white
        ">
          👨‍🏫 Teachers
        </h1>

        <p className="
          text-gray-400
          mt-1
        ">
          Gestión académica enterprise
        </p>

      </div>


      {/* 🔥 EMPTY */}
      {teachers.length === 0 && (

        <div className="
          bg-gray-900
          border
          border-gray-800
          rounded-2xl
          p-10
          text-center
          text-gray-400
        ">

          No teachers found

        </div>

      )}


      {/* 🔥 GRID */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-3
        gap-6
      ">

        {teachers.map((teacher) => (

          <div
            key={teacher.id}
            className="
              bg-gray-900
              border
              border-gray-800
              rounded-2xl
              p-6
              shadow-xl
              hover:border-blue-500
              transition-all
            "
          >

            {/* 🔥 NAME */}
            <div>

              <h2 className="
                text-xl
                font-bold
                text-white
              ">

                {teacher.first_name}
                {" "}
                {teacher.last_name}

              </h2>

              <p className="
                text-gray-400
                text-sm
                mt-1
              ">
                {teacher.email}
              </p>

            </div>


            {/* 🔥 METRICS */}
            <div className="
              mt-5
              flex
              items-center
              justify-between
            ">

              <div>

                <p className="
                  text-gray-500
                  text-sm
                ">
                  Groups
                </p>

                <h3 className="
                  text-white
                  text-2xl
                  font-bold
                ">
                  {teacher.groups_count}
                </h3>

              </div>

            </div>


            {/* 🔥 ACTIONS */}
            <div className="
              mt-6
              flex
              gap-3
            ">

              <button
                className="
                  flex-1
                  bg-blue-600
                  hover:bg-blue-700
                  text-white
                  py-2
                  rounded-xl
                  font-semibold
                  transition-all
                "
              >
                Edit
              </button>

              <button
                onClick={() =>
                  deleteTeacher(
                    teacher.id
                  )
                }
                className="
                  flex-1
                  bg-red-600
                  hover:bg-red-700
                  text-white
                  py-2
                  rounded-xl
                  font-semibold
                  transition-all
                "
              >
                Delete
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}