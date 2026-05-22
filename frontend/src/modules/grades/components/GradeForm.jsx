import { useEffect, useState } from "react"
import Button from "../../../components/ui/Button"

export default function GradeForm({ onSubmit, selectedGrade, students }) {
  const [form, setForm] = useState({
    studentId: "",
    subject: "",
    score: "",
    period: ""
  })

  useEffect(() => {
    if (selectedGrade) {
      setForm({
        studentId: selectedGrade.studentId || "",
        subject: selectedGrade.subject || "",
        score: selectedGrade.score || "",
        period: selectedGrade.period || ""
      })
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

    if (!form.studentId) {
      alert("Select a student")
      return
    }

    onSubmit({
      ...form,
      score: Number(form.score)
    })

    setForm({ studentId: "", subject: "", score: "", period: "" })
  }

  return (
    <form onSubmit={handleSubmit} className="card row">
      
      <select
        name="studentId"
        value={form.studentId}
        onChange={handleChange}
        className="input"
      >
        <option value="">Select student</option>
        {students.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      <input
        name="subject"
        placeholder="Subject"
        value={form.subject}
        onChange={handleChange}
        className="input"
      />

      <input
        name="score"
        type="number"
        min="0"
        max="10"
        placeholder="Score"
        value={form.score}
        onChange={handleChange}
        className="input"
      />

      <input
        name="period"
        placeholder="Period"
        value={form.period}
        onChange={handleChange}
        className="input"
      />

      <Button variant="primary" type="submit">
        {selectedGrade ? "Update" : "Create"}
      </Button>
    </form>
  )
}