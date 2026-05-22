import { useEffect, useState } from "react"

import StudentList from "../../students/components/StudentList"
import TeachersCounter from "../../teacher/components/TeachersCounter"
import StudentSearch from "../../students/components/StudentSearch.jsx"
import Dashboard from "../../dashboard/components/Dashboard"

import { useStudents } from "../../students/hooks/useStudents"
import { useGrades } from "../../grades/hooks/useGrades"

import { useRiskSocket } from "../../../hooks/useRiskSocket"

export default function DashboardPage() {

  const {
    students,
    addStudent,
    deleteStudent,
    editStudent,
    fetchStudents
  } = useStudents()

  const {
    grades,
    fetchGrades
  } = useGrades()

  const [teachers, setTeachers] = useState(5)
  const [search, setSearch] = useState("")

  // 🚨 REALTIME RISK ALERT
  const [riskAlert, setRiskAlert] = useState(null)

  // 🔥 SOCKET LISTENER
  useRiskSocket(setRiskAlert)

  // 🔥 LOAD DATA (SIN LOOP)
  useEffect(() => {
    fetchStudents()
    fetchGrades()
  }, [])

  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  function increaseTeachers() {
    setTeachers(prev => prev + 1)
  }

  // 🔥 MÉTRICAS PRO
  const studentsWithMetrics = students.map(student => {

    const studentGrades = grades.filter(
      g => String(g.studentId) === String(student.id)
    )

    const total = studentGrades.length

    const average =
      total > 0
        ? studentGrades.reduce((acc, g) => acc + g.score, 0) / total
        : 0

    const progress =
      total > 0
        ? Math.min((total / 5) * 100, 100)
        : 0

    return {
      ...student,
      average,
      progress
    }
  })

  // 🔥 STATUS INTELIGENTE
  const getStatus = (avg) => {

    if (avg >= 9) {
      return {
        label: "🟢 Excelente",
        color: "text-green-400"
      }
    }

    if (avg >= 7) {
      return {
        label: "🟡 Regular",
        color: "text-yellow-400"
      }
    }

    return {
      label: "🔴 Riesgo",
      color: "text-red-400"
    }
  }

  return (
    <>

      {/* 🚨 REALTIME ALERT */}
      {riskAlert && (

        <div className="bg-red-500/20 border border-red-500 text-white p-5 rounded-2xl shadow-lg mb-6 animate-pulse">

          <h2 className="text-xl font-bold mb-2">
            🚨 Alumno en Riesgo
          </h2>

          <p>
            Promedio actual:
            <span className="font-semibold ml-2">
              {riskAlert.average}
            </span>
          </p>

          <p>
            Nivel:
            <span className="font-semibold ml-2">
              {riskAlert.risk.level}
            </span>
          </p>

          <p className="mt-2 text-red-200">
            {riskAlert.risk.message}
          </p>

        </div>
      )}

      {/* 🔥 DASHBOARD TOP */}
      <Dashboard
        studentsCount={students.length}
        teachersCount={teachers}
        averageAge={"--"}
      />

      {/* 🔥 TEACHER DASHBOARD PRO */}
      <div className="grid gap-4 my-6">

        {studentsWithMetrics.map(student => {

          const status = getStatus(student.average)

          return (
            <div
              key={student.id}
              className="bg-gray-800 p-5 rounded-xl shadow"
            >

              <h3 className="text-white font-semibold text-lg">
                {student.name}
              </h3>

              <p className={status.color}>
                {status.label}
              </p>

              <p className="text-gray-300">
                Promedio: {student.average.toFixed(2)}
              </p>

              <p className="text-gray-400">
                Progreso: {student.progress}%
              </p>

            </div>
          )
        })}
      </div>

      {/* 🔍 SEARCH */}
      <div className="controls">
        <StudentSearch
          value={search}
          onChange={setSearch}
        />
      </div>

      {/* 📋 STUDENTS */}
      <StudentList
        students={filteredStudents}
        onDelete={deleteStudent}
        onEdit={editStudent}
        onAdd={addStudent}
      />

      {/* 👨‍🏫 TEACHERS */}
      <TeachersCounter
        teachers={teachers}
        onIncrease={increaseTeachers}
      />

    </>
  )
}