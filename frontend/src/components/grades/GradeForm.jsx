import { useEffect, useState } from "react"

export default function GradeForm({ onSubmit, selectedGrade }) {
  const [form, setForm] = useState({
    studentId: "",
    subject: "",
    score: "",
    period: ""
  })

  useEffect(() => {
    if (selectedGrade) {
      setForm(selectedGrade)
    }
  }, [selectedGrade])

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(form)
    setForm({ studentId: "", subject: "", score: "", period: "" })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="studentId" placeholder="Student ID" value={form.studentId} onChange={handleChange} />
      <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} />
      <input name="score" placeholder="Score" value={form.score} onChange={handleChange} />
      <input name="period" placeholder="Period" value={form.period} onChange={handleChange} />

      <button type="submit">
        {selectedGrade ? "Update" : "Create"}
      </button>
    </form>
  )
}