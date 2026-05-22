import { useAuth } from "../../../context/AuthContext";
import { hasPermission } from "../../../utils/permissions";
import Button from "../../../components/ui/Button";

export default function GradeList({
  grades = [],
  onEdit,
  onDelete
}) {

  const { user } = useAuth();



  // 🟣 CALCULATE AVERAGE
  const calculateAverage = (studentGrades) => {

    if (!studentGrades?.length) {
      return 0;
    }

    const total =
      studentGrades.reduce((acc, g) => {

        return acc + (Number(g.grade) || 0);

      }, 0);

    return total / studentGrades.length;
  };



  // 🟣 RISK COLORS
  const getColor = (avg) => {

    if (avg >= 9) {
      return "text-green-400";
    }

    if (avg >= 7) {
      return "text-yellow-400";
    }

    return "text-red-400";
  };



  // 🟣 GROUP BY REAL STUDENT ID
  const gradesByStudent =
    grades.reduce((acc, grade) => {

      const key =
        String(grade.student_id);

      if (!acc[key]) {
        acc[key] = [];
      }

      acc[key].push(grade);

      return acc;

    }, {});



  if (!grades.length) {

    return (
      <p className="text-gray-400">
        No hay calificaciones registradas.
      </p>
    );
  }



  return (

    <div className="space-y-6">

      {Object.entries(gradesByStudent)

        .sort((a, b) =>
          calculateAverage(b[1]) -
          calculateAverage(a[1])
        )

        .map(([studentId, studentGrades]) => {

          const avg =
            calculateAverage(studentGrades);

          const studentName =
            studentGrades[0]?.student_name ||
            "Unknown";



          return (

            <div
              key={studentId}
              className="
                bg-secondary
                p-5
                rounded-xl
                shadow
              "
            >

              {/* 🔥 STUDENT */}
              <div className="mb-4">

                <h3 className="
                  text-lg
                  font-semibold
                  text-white
                ">
                  {studentName}
                </h3>

                <p className={`
                  font-bold
                  ${getColor(avg)}
                `}>
                  Average: {avg.toFixed(2)}
                </p>

              </div>



              {/* 🔥 GRADES */}
              <div className="space-y-3">

                {studentGrades.map((g) => (

                  <div
                    key={g.id}
                    className="
                      flex
                      items-center
                      justify-between
                      bg-gray-800
                      p-3
                      rounded-lg
                    "
                  >

                    <div>

                      <p className="text-white font-medium">
                        {g.assignment_title}
                      </p>

                      <p className="text-gray-400 text-sm">
                        Grade: {g.grade}
                      </p>

                    </div>



                    {hasPermission(user, "update:grades") && (

                      <div className="flex gap-2">

                        <Button
                          variant="ghost"
                          onClick={() => onEdit(g)}
                        >
                          ✏️
                        </Button>

                        <Button
                          variant="danger"
                          onClick={() => onDelete(g.id)}
                        >
                          🗑
                        </Button>

                      </div>
                    )}

                  </div>
                ))}

              </div>

            </div>
          );
        })}
    </div>
  );
}