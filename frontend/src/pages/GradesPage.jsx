import { useEffect, useState } from "react"
import { useGrades } from "../hooks/useGrades"
import GradeList from "../components/grades/GradeList"
import GradeForm from "../components/grades/GradeForm"
import { useAuth } from "../context/AuthContext"
import { useStudents } from "../hooks/useStudents"
import { hasPermission } from "../utils/permissions"


export default function GradesPage() {
  const { grades, fetchGrades, createGrade, updateGrade, deleteGrade } = useGrades()
  const { user } = useAuth()

  const [selectedGrade, setSelectedGrade] = useState(null)


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

  const { students, fetchStudents } = useStudents()

  useEffect(() => {
    fetchGrades()
    fetchStudents()
  }, [])

  let filteredGrades = grades

  if (user.role === "parent") {
    filteredGrades = grades.filter(
      g => g.studentId == user.studentId
    )
  }

  return (
    <div>
      <h1>Grades</h1>

      {hasPermission(user, "create:grades") && (
        <GradeForm 
          onSubmit={handleSubmit}
          selectedGrade={selectedGrade}
          students={students}
        />
      )}
      <GradeList
        grades={filteredGrades}
        students={students}
        onEdit={handleEdit}
        onDelete={handleDelete}
        role={user.role}
      />
    </div>
  )
}
