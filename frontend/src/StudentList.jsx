
import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import StudentForm from "./StudentForm" 

function StudentList({ students, onDelete, onEdit, onAdd }) {
  const [editingId, setEditingId] = useState(null)
  const [editingValue, setEditingValue] = useState("")
  const [showForm, setShowForm] = useState(false) 

  const { user } = useAuth()
  const isAdmin = user?.role === "admin" 

  function startEditing(student) {
    setEditingId(student.id)
    setEditingValue(student.name)
  }

  function saveEdit() {
    const trimmedName = editingValue.trim()
    if (!trimmedName) {
      alert("Name can't be empty")
      return
    }
    const exists = students.some(s => s.name === trimmedName && s.id !== editingId)
    if (exists) {
      alert(`❌ "${trimmedName}" already on the list`)
      return
    }
    const studentToEdit = students.find(s => s.id === editingId)
    onEdit(editingId, { ...studentToEdit, name: trimmedName })
    setEditingId(null)
    setEditingValue("")
  }

  function handleAddStudent(newStudent) {
    onAdd(newStudent)
    setShowForm(false) 
  }

  return (
    <div>
      <h2>Students ({students.length})</h2>

      
      {isAdmin && (
        <button onClick={() => setShowForm(prev => !prev)}>
          {showForm ? "Cancel" : "Add Student"}
        </button>
      )}

      
      {isAdmin && showForm && (
        <StudentForm onSubmit={handleAddStudent} />
      )}

      <ul>
        {students.map((s) => (
          <li key={s.id} style={{ marginBottom: "10px" }}>
            {editingId === s.id ? (
              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <input
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                />
                <button onClick={saveEdit}>💾</button>
                <button onClick={() => setEditingId(null)}>❌</button>
              </div>
            ) : (
              <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
                <span style={{ marginRight: "15px" }}>{s.name} - {s.age} yrs</span>
                
                {isAdmin && (
                  <>
                    <button onClick={() => startEditing(s)}>✏️</button>
                    <button onClick={() => onDelete(s.id)}>🗑</button>
                  </>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentList
