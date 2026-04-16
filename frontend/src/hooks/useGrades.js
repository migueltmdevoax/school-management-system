import { useState } from "react"

const API_URL = "http://localhost:3000/api/grades"

export function useGrades() {
  const [grades, setGrades] = useState([])

  const fetchGrades = async () => {
    const res = await fetch(API_URL)
    const data = await res.json()
    setGrades(data)
  }

  const fetchGradesByStudent = async (studentId) => {
    const res = await fetch(`${API_URL}/student/${studentId}`)
    const data = await res.json()
    setGrades(data)
  }

  const createGrade = async (grade) => {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(grade)
    })
    return res.json()
  }

  const updateGrade = async (id, grade) => {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(grade)
    })
    return res.json()
  }

  const deleteGrade = async (id) => {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    })
  }

  return {
    grades,
    fetchGrades,
    fetchGradesByStudent,
    createGrade,
    updateGrade,
    deleteGrade
  }
}