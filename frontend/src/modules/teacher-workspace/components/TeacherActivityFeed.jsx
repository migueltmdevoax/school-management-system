export default function TeacherActivityFeed({

  assignments,
  grades,

}) {

  const recentAssignments =
    assignments.slice(0, 5);

  const recentGrades =
    grades.slice(0, 5);




  return (

    <div className="
      bg-gray-900
      border
      border-gray-800
      rounded-3xl
      p-6
    ">

      <h2 className="
        text-2xl
        font-bold
        text-white
        mb-6
      ">
        🔥 Recent Activity
      </h2>





      <div className="
        space-y-4
      ">

        {recentAssignments.map((assignment) => (

          <div

            key={`assignment-${assignment.id}`}

            className="
              bg-gray-800
              rounded-2xl
              p-4
            "
          >

            <p className="
              text-white
            ">
              📚 Assignment created:
              {" "}
              <span className="font-bold">
                {assignment.title}
              </span>
            </p>

          </div>

        ))}





        {recentGrades.map((grade) => (

          <div

            key={`grade-${grade.id}`}

            className="
              bg-gray-800
              rounded-2xl
              p-4
            "
          >

            <p className="
              text-white
            ">
              📝 Grade submitted:
              {" "}
              <span className="font-bold">
                {grade.grade}
              </span>
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}