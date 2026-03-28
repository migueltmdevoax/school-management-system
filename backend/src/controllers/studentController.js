let students = []



export const getStudents = (req, res) => {
  res.json(students)
}


export const createStudent = (req, res) => {
  console.log("BODY:", req.body)

  const newStudent = {
    id: Date.now(),
    ...req.body
  }
  students.push(newStudent)
  res.status(201).json(newStudent)
}


export const deleteStudent = (req, res) => {
  const { id } = req.params
  students = students.filter(s => s.id != id)
  res.json({ message: "Deleted" })
}


export const updateStudent = (req, res) => {
  const { id } = req.params
  students = students.map(s =>
    s.id == id ? { ...s, ...req.body } : s
  )
  res.json({ message: "Updated" })
}