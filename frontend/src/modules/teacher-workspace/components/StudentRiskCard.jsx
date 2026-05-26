export default function StudentRiskCard({

  students

}) {

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
        🚨 Student Risk Monitor
      </h2>





      {students.length === 0 ? (

        <div className="
          text-gray-400
        ">
          No high-risk students detected
        </div>

      ) : (

        <div className="
          space-y-4
        ">

          {students.map((student) => (

            <div

              key={student.id}

              className="
                bg-red-500/10
                border
                border-red-500/20
                rounded-2xl
                p-4
              "
            >

              <h3 className="
                text-white
                font-bold
              ">
                {student.name}
              </h3>

              <p className="
                text-red-400
                text-sm
                mt-1
              ">
                High academic risk
              </p>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}