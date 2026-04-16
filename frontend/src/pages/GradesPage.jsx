import { useEffect, useState } from "react"
import { useGrades } from "../hooks/useGrades"
import GradeList from "../components/grades/GradeList"
import GradeForm from "../components/grades/GradeForm"
import { useAuth } from "../context/AuthContext"

export default function GradesPage() {
  const { grades, fetchGrades, createGrade, updateGrade, deleteGrade } = useGrades()
  const { user } = useAuth()

  const [selectedGrade, setSelectedGrade] = useState(null)

  useEffect(() => {
    fetchGrades()
  }, [])

  const handleSubmit = async (data) => {
    if (selectedGrade) {
      await updateGrade(selectedGrade.id, data)
    } else {
      await createGrade(data)
    }

    fetchGrades()
    setSelectedGrade(null)
  }

  const handleEdit = (grade) => {
    setSelectedGrade(grade)
  }

  const handleDelete = async (id) => {
    await deleteGrade(id)
    fetchGrades()
  }

  return (
    <div>
      <h1>Grades</h1>

      {(user.role === "admin" || user.role === "teacher") && (
        <GradeForm onSubmit={handleSubmit} selectedGrade={selectedGrade} />
      )}

      <GradeList
        grades={grades}
        onEdit={handleEdit}
        onDelete={handleDelete}
        role={user.role}
      />
    </div>
  )
}