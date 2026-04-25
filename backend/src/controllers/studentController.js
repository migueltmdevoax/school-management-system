import { pool } from "../../db/connection.js"

export const getStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, first_name, last_name, email, created_at FROM students ORDER BY created_at DESC"
    )
    res.json({ message: "Students retrieved", data: result.rows })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error getting students" })
  }
}

export const getStudentWithGrades = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" })
    }

    const result = await pool.query(
      `SELECT 
        s.id,
        s.first_name,
        s.last_name,
        s.email,
        g.subject,
        g.grade
       FROM students s
       LEFT JOIN grades g ON s.id = g.student_id
       WHERE s.id = $1`,
      [id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" })
    }

    const rows = result.rows

    const student = {
      id: rows[0].id,
      first_name: rows[0].first_name,
      last_name: rows[0].last_name,
      email: rows[0].email,
      grades: []
    }

    rows.forEach(row => {
      if (row.subject) {
        student.grades.push({
          subject: row.subject,
          grade: parseFloat(row.grade)
        })
      }
    })

    if (rows.length === 0) {
      return res.status(404).json({ error: "Student not found" })
    }

    res.json({ message: "Student with grades", data: student })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error getting student with grades" })
  }
}

export const getAllStudentsWithGrades = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT 
        s.id,
        s.first_name,
        s.last_name,
        s.email,
        g.subject,
        g.grade
       FROM students s
       LEFT JOIN grades g ON s.id = g.student_id
       ORDER BY s.id` 
    )

    const rows = result.rows
    
    const studentsMap = new Map()

    rows.forEach(row => {
      if (!studentsMap.has(row.id)) {
        studentsMap.set(row.id, {
          id: row.id,
          first_name: row.first_name,
          last_name: row.last_name,
          email: row.email,
          grades: [] 
        })
      }

      if (row.subject) {
        studentsMap.get(row.id).grades.push({
          subject: row.subject,
          grade: parseFloat(row.grade)
        })
      }
    })

    const formattedData = Array.from(studentsMap.values())

    res.json({ 
      message: "All students with their grades", 
      data: formattedData 
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error getting all students with grades" })
  }
}

export const createStudent = async (req, res) => {
  try {
    const { first_name, last_name, email } = req.body

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: "Missing fields" })
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" })
    }

    const result = await pool.query(
      `INSERT INTO students (first_name, last_name, email)
       VALUES ($1, $2, $3)
       RETURNING id, first_name, last_name, email, created_at`,
      [first_name, last_name, email]
    )

    res.status(201).json({ message: "Student created", data: result.rows[0] })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "Email already exists" })
    }
    console.error(error)
    res.status(500).json({ error: "Error creating student" })
  }
}

export const deleteStudent = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" })
    }

    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING id, first_name, last_name, email, created_at",
      [id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" })
    }

    res.json({ message: "Student deleted", data: result.rows[0] })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Error deleting student" })
  }
}

export const updateStudent = async (req, res) => {
  try {
    const id = parseInt(req.params.id)

    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid ID" })
    }

    const { first_name, last_name, email } = req.body

    if (!first_name || !last_name || !email) {
      return res.status(400).json({ error: "Missing fields" })
    }

    if (!email.includes("@")) {
      return res.status(400).json({ error: "Invalid email" })
    }

    const result = await pool.query(
      `UPDATE students 
       SET first_name = $1, last_name = $2, email = $3
       WHERE id = $4
       RETURNING id, first_name, last_name, email, created_at`,
      [first_name, last_name, email, id]
    )

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Student not found" })
    }

    res.json({ message: "Student updated", data: result.rows[0] })
  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({ error: "Email already exists" })
    }

    console.error(error)
    res.status(500).json({ error: "Error updating student" })
  }
}