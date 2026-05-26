export default function PendingSubmissionsCard({

  assignments

}) {

  return (

    <div className="
      bg-gray-900
      border
      border-gray-800
      rounded-3xl
      p-6
    ">

      <div className="
        flex
        items-center
        justify-between
        mb-6
      ">

        <h2 className="
          text-2xl
          font-bold
          text-white
        ">
          ⏳ Pending Submissions
        </h2>

      </div>





      {assignments.length === 0 ? (

        <div className="
          text-gray-400
        ">
          Everything is up to date 🚀
        </div>

      ) : (

        <div className="
          space-y-4
        ">

          {assignments.map((assignment) => (

            <div

              key={assignment.id}

              className="
                bg-gray-800
                rounded-2xl
                p-4
                flex
                items-center
                justify-between
              "
            >

              <div>

                <h3 className="
                  text-white
                  font-bold
                ">
                  {assignment.title}
                </h3>

                <p className="
                  text-gray-400
                  text-sm
                  mt-1
                ">
                  Pending students:
                  {" "}
                  {

                    Number(
                      assignment.assigned_students
                    )

                    -

                    Number(
                      assignment.submissions_count
                    )

                  }
                </p>

              </div>





              <div className="
                text-orange-400
                font-bold
              ">
                ⚠️
              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}