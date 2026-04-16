export default function GradeList({ grades, onEdit, onDelete, role }) {
  return (
    <div>
      {grades.map((g) => (
        <div key={g.id}>
          <p>{g.studentId} - {g.subject} - {g.score}</p>

          {(role === "admin" || role === "teacher") && (
            <>
              <button onClick={() => onEdit(g)}>Edit</button>
              <button onClick={() => onDelete(g.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}