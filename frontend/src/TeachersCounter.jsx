
function TeachersCounter({ teachers, onIncrease }) {
  return (
    <div>
      <h2>Teachers: {teachers}</h2>
      <button onClick={onIncrease}>Add teacher</button>
    </div>
  )
}

export default TeachersCounter

