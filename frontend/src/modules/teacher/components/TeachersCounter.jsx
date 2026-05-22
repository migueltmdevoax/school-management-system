import Button from "../../../components/ui/Button"

function TeachersCounter({ teachers, onIncrease }) {
  return (
    <div>
      <h2>Teachers: {teachers}</h2>
      <Button variant="primary" onClick={onIncrease}>Add teacher</Button>
    </div>
  )
}

export default TeachersCounter
