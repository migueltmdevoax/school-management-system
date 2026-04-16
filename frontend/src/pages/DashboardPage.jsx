import { useState } from "react"
import StudentList from "../StudentList"
import TeachersCounter from "../TeachersCounter"
import StudentSearch from "../StudentSearch"
import Dashboard from "../Dashboard"
import { useStudents } from "../hooks/useStudents"

export default function DashboardPage() { 

  const {
  students,
  addStudent,
  deleteStudent,
  editStudent,
  averageAge
  } = useStudents()


  const [teachers, setTeachers] = useState(5)
  const [search, setSearch] = useState("")

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )
  
  function increaseTeachers() {
    setTeachers(prev => prev + 1)
  }

  return (
    <>
      <Dashboard
        studentsCount={students.length}
        teachersCount={teachers}
        averageAge={averageAge.toFixed(1)}
      />

      <div className="controls">
        <StudentSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      <StudentList
        students={filteredStudents}
        onDelete={deleteStudent}
        onEdit={editStudent}
        onAdd={addStudent}
      /> 

      <TeachersCounter 
        teachers={teachers}
        onIncrease={increaseTeachers}
      />
    </>
  )
}

