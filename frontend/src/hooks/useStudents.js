import { useEffect, useState } from "react"

const API_URL = "http://localhost:3000/api/students"

export function useStudents() {
  const [students, setStudents] = useState([])

  // 🔹 GET
  const fetchStudents = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    setStudents(data)
  }

  // 🔹 POST
  const addStudent = async (student) => {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student)
    })

    fetchStudents()
  }

  // 🔹 DELETE
  const deleteStudent = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })

    fetchStudents()
  }

  // 🔹 PUT
  const editStudent = async (id, updated) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
    })

    fetchStudents()
  }

  const averageAge =
  students.length > 0
    ? students.reduce((acc, s) => acc + s.age, 0) / students.length
    : 0

  useEffect(() => {
    fetchStudents()
  }, [])

  return {
    students,
    addStudent,
    deleteStudent,
    editStudent,
    averageAge
  }
}






