let grades = []

export const getGrades = (req, res) => {
  const { role } = req.user

  // 👑 admin ve todo
  if (role === "admin") {
    return res.json(grades)
  }

  // 🧑‍🏫 teacher (por ahora ve todo, luego filtramos)
  if (role === "teacher") {
    return res.json(grades)
  }

  // 👨‍👩‍👧 parent → SOLO su hijo
  if (role === "parent") {
    const userStudentId = req.user.studentId

    const filtered = grades.filter(
      g => Number(g.studentId) === Number(userStudentId)
    )

    return res.json(filtered)
  }

  // ❌ default
  return res.status(403).json({ message: "Forbidden" })
}



export const createGrade = (req, res) => {

  const { role } = req.user

  if (role !== "admin" && role !== "teacher") {
    return res.status(403).json({ message: "Forbidden" })
  }

  const { studentId, subject, score, period } = req.body

  if (!studentId || !subject || score === undefined) {
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

  const { role } = req.user

  if (role !== "admin" && role !== "teacher") {
    return res.status(403).json({ message: "Forbidden" })
  }

  const { id } = req.params

  grades = grades.map(g =>
    g.id == id ? { ...g, ...req.body } : g
  )

  res.json({ message: "Updated" })
}



export const deleteGrade = (req, res) => {
  const { role } = req.user

  if (role !== "admin" && role !== "teacher") {
    return res.status(403).json({ message: "Forbidden" })
  }

  const { id } = req.params

  grades = grades.filter(g => g.id != id)
  res.json({ message: "Deleted" })
}



export const getGradesByStudent = (req, res) => {

  const { role } = req.user

  if (role !== "admin" && role !== "teacher") {
    return res.status(403).json({ message: "Forbidden" })
  }

  const { studentId } = req.params

  const studentGrades = grades.filter(g => g.studentId == studentId)

  res.json(studentGrades)
}