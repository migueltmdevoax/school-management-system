
import { useState } from "react"

function StudentForm({ onSubmit, onClose, existingStudents = [], buttonText }) {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")


  function handleSubmit(e) {
    e.preventDefault()

    const trimmed = name.trim()
    if (trimmed === "") {
      alert("❌ Name can't be empty")
      return  
    }

    const parsedAge = parseInt(age)
    if (isNaN(parsedAge) || parsedAge < 5) {
        alert("The student must be at least 5 years old")
        return
    }

    if (existingStudents.some(s => s.name.toLowerCase() === trimmed.toLowerCase())) {
      alert(`❌ "${trimmed}" Already on list`)
      return 
    }

    onSubmit({
     name: trimmed,
     age: parsedAge
    })
    onClose?.()
    setName("")
    setAge("")
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
      <input
        type="text"
        placeholder="Student name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button>{buttonText || "Add Student"}</button>
      <button type="button" onClick={onClose}>
        Cancel
      </button>
    </form>
  )
}

export default StudentForm

