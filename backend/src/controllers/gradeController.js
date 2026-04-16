let grades = []

export const getGrades = (req, res) => {
  res.json(grades)
}

export const createGrade = (req, res) => {
  const { studentId, subject, score, period } = req.body

  if (!studentId || !subject || !score) {
    return res.status(400).json({ message: "Missing required fields" })
  }

  const newGrade = {
    id: Date.now(),
    studentId,
    subject,
    score,
    period,
    createdAt: new Date()
  }

  grades.push(newGrade)
  res.status(201).json(newGrade)
}

export const updateGrade = (req, res) => {
  const { id } = req.params

  grades = grades.map(g =>
    g.id == id ? { ...g, ...req.body } : g
  )

  res.json({ message: "Updated" })
}

export const deleteGrade = (req, res) => {
  const { id } = req.params

  grades = grades.filter(g => g.id != id)
  res.json({ message: "Deleted" })
}

export const getGradesByStudent = (req, res) => {
  const { studentId } = req.params

  const studentGrades = grades.filter(g => g.studentId == studentId)

  res.json(studentGrades)
}