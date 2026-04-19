import { useAuth } from "../context/AuthContext"
import { useGrades } from "../hooks/useGrades"
import { useEffect } from "react"

export default function ParentDashboard() {
  const { user } = useAuth()
  const { grades, fetchGradesByStudent } = useGrades()

  useEffect(() => {
    fetchGradesByStudent(user.studentId)
  }, [])

  const average =
  grades.length > 0
    ? grades.reduce((acc, g) => acc + g.score, 0) / grades.length
    : 0

  return (
   <div style={{ padding: "20px" }}>
    <h1>Bienvenido</h1>

    <h2>Calificaciones</h2>

    <h3>Promedio: {average.toFixed(2)}</h3>

    {grades.map((g) => (
      <div key={g.id} style={{ marginBottom: "10px" }}>
        <strong>{g.subject}</strong>: {g.score}
      </div>
    ))}
   </div>
  )
}