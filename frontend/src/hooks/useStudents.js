import { useEffect, useState } from "react"

const API_URL = "http://localhost:3000/api/students"

export function useStudents() {
  const [students, setStudents] = useState([])

  
  const fetchStudents = async () => {
    try {
      const res = await fetch(API_URL)

      if(!res.ok) {
        throw new Error("Error fetching students")
      }

      const data = await res.json()
      setStudents(data)
    } catch (error) {
      console.error("FETCH STUDENTS ERROR:", error)
    }
    
  }

  const addStudent = async (student) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student)
      })

      if (!res.ok) {
        throw new Error("Error creating student")
      }

      await fetchStudents() // 👈 IMPORTANTE
    } catch (error) {
      console.error("ADD STUDENT ERROR:", error)
    }
  }


  const deleteStudent = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
      })

      if (!res.ok) {
        throw new Error("Error when deleting student")
      }
      await fetchStudents()
    } catch (error) {
      console.error("DELETE STUDENT ERROR:", error)
    }
    
  }

  
  const editStudent = async (id, updated) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated)
      })

      if (!res.ok) {
        throw new Error("Error while editing student")
      }

      await fetchStudents()
    } catch (error) {
      console.error("UPDATE STUDENT ERROR:", error)
    }
    
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






