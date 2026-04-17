export default function GradeList({ grades = [], students = [], role, onEdit, onDelete }) {
    
    const studentMap = students.reduce((acc, s) => {
      acc[s.id] = s.name;
      return acc;
    }, {});

    const getStudentName = (id) => studentMap[id] || "Unknown";

    const calculateAverage = (studentGrades) => {
      if (!studentGrades || studentGrades.length === 0) return 0;
      const total = studentGrades.reduce((acc, g) => acc + (Number(g.score) || 0), 0);
      return total / studentGrades.length; 
    };

    const getColor = (avg) => {
      if (avg >= 9) return "green";
      if (avg >= 7) return "orange";
      return "red";
    };

    const gradesByStudent = grades.reduce((acc, grade) => {
      if (!acc[grade.studentId]) {
        acc[grade.studentId] = [];
      }
      acc[grade.studentId].push(grade);
      return acc;
    }, {});

    if (!grades || grades.length === 0) return <p>No hay calificaciones registradas.</p>;

    

    return (
     <div>
     {Object.entries(gradesByStudent)
      .sort((a, b) => calculateAverage(b[1]) - calculateAverage(a[1]))
      .map(([studentId, studentGrades]) => {

        const avg = calculateAverage(studentGrades)

        return (
          <div key={`student-${studentId}`} style={{ marginBottom: "20px" }}>
            
            <h3>{getStudentName(studentId)}</h3>

            <p style={{ color: getColor(avg) }}>
              <strong>Average:</strong> {avg.toFixed(2)}
            </p>

            {studentGrades.map((g) => (
              <div key={g.id}>
                <span>{g.subject} - {g.score}</span>

                {(role === "admin" || role === "teacher") && (
                  <>
                    <button onClick={() => onEdit(g)}>Edit</button>
                    <button onClick={() => onDelete(g.id)}>Delete</button>
                  </>
                )}
              </div>
            ))}
          </div>
        )
      })}
     </div>
    )

}