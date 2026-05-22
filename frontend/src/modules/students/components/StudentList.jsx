import { useState } from "react"
import { useAuth } from "../../../context/AuthContext"
import Button from "../../../components/ui/Button"

function StudentList({ students, onDelete, onEdit }) {
  const [editingId, setEditingId] = useState(null)
  const [editingValue, setEditingValue] = useState("")

  const { user } = useAuth()
  const isAdmin = user?.role === "admin"

  function startEditing(student) {
    setEditingId(student.id)
    setEditingValue(student.name)
  }

  function saveEdit() {
    const trimmedName = editingValue.trim()

    if (!trimmedName) return alert("Name can't be empty")

    const exists = students.some(
      s => s.name === trimmedName && s.id !== editingId
    )

    if (exists) return alert(`❌ "${trimmedName}" already exists`)

    const studentToEdit = students.find(s => s.id === editingId)

    onEdit(editingId, { ...studentToEdit, name: trimmedName })

    setEditingId(null)
    setEditingValue("")
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-white">
        Students ({students.length})
      </h2>

      <ul className="space-y-3">
        {students.map((s) => (
          <li key={s.id} className="bg-secondary p-4 rounded-lg flex justify-between items-center">

            {editingId === s.id ? (
              <div className="flex gap-2">
                <input
                  className="px-2 py-1 rounded"
                  value={editingValue}
                  onChange={(e) => setEditingValue(e.target.value)}
                />
                <Button variant="primary" onClick={saveEdit}>💾</Button>
                <Button variant="danger" onClick={() => setEditingId(null)}>❌</Button>
              </div>
            ) : (
              <>
                <span>{s.name}</span>

                {isAdmin && (
                  <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => startEditing(s)}>✏️</Button>
                    <Button variant="danger" onClick={() => onDelete(s.id)}>🗑</Button>
                  </div>
                )}
              </>
            )}

          </li>
        ))}
      </ul>
    </div>
  )
}

export default StudentList