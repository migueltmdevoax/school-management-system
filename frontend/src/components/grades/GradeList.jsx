export default function GradeList({ grades, students, role, onEdit, onDelete }) {

    const getStudentName = (id) => {
      const student = students.find(s => s.id == id)
      return student ? student.name : "Unknown"
    }
  return (
    <div>
      {grades.map((g) => (
        <div key={g.id}>
          <p>
            {getStudentName(g.studentId)} - {g.subject} - {g.score}
          </p>
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