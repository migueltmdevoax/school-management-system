import { useState } from "react"
import { useStudents } from "../hooks/useStudents"
import StudentList from "../StudentList"
import StudentForm from "../StudentForm"

export default function StudentsPage() {
  const {
    students,
    addStudent,
    deleteStudent,
    editStudent
  } = useStudents()

  const [showForm, setShowForm] = useState(false)

  function handleAddStudent(newStudent) {
    addStudent(newStudent)
    setShowForm(false)
  }

  return (
    <div>
      <h1>Gestión de Alumnos</h1>

      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? "Cancel" : "Add Student"}
      </button>

      {showForm && (
        <StudentForm
          onSubmit={handleAddStudent}
          onClose={() => setShowForm(false)}
          existingStudents={students}
        />
      )}

      <StudentList
        students={students}
        onDelete={deleteStudent}
        onEdit={editStudent}
      />
    </div>
  )
}