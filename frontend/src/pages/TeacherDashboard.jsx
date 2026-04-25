import { useEffect } from "react"
import { useStudents } from "../hooks/useStudents"
import { useGrades } from "../hooks/useGrades"

export default function TeacherDashboard() {
  const { students, fetchStudents } = useStudents()
  const { grades, fetchGrades } = useGrades()

  useEffect(() => {
    fetchStudents()
    fetchGrades()
  }, [])

  const getGradesByStudent = (studentId) => {
  return grades.filter(g => Number(g.studentId) === Number(studentId))
}

  const calculateAverage = (studentGrades) => {
    if (studentGrades.length === 0) return 0
    const total = studentGrades.reduce((acc, g) => acc + g.score, 0)
    return total / studentGrades.length
  }

  const getStatus = (studentGrades, avg) => {
  if (!studentGrades || studentGrades.length === 0) {
    return "⚪ Sin datos"
  }

  if (avg >= 9) return "🟢 Excelente"
  if (avg >= 7) return "🟡 Atención"
  return "🔴 Riesgo"
}

  console.log("TEACHER DASHBOARD RENDER")
  console.log("students:", students)
  console.log("grades:", grades)

  return (
    <div style={{ padding: "20px" }}>
      <h1>Teacher Dashboard</h1>

      {students.map((s) => {
        const studentGrades = getGradesByStudent(s.id)
        const avg = calculateAverage(studentGrades)

        return (
          <div key={s.id} style={{ marginBottom: "20px" }}>
            <h3>{s.name}</h3>

            <p>
              Promedio: {studentGrades.length > 0 ? avg.toFixed(2) : "N/A"}
            </p>

            <p>{getStatus(studentGrades, avg)}</p>

            {studentGrades.map((g) => (
              <div key={g.id}>
                {g.subject} - {g.score}
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}