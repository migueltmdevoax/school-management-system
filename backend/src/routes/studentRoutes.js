import express from "express"
import {
  getStudents,
  createStudent,
  deleteStudent,
  updateStudent
} from "../controllers/studentController.js"

import { getStudentWithGrades } from "../controllers/studentController.js"
import { getAllStudentsWithGrades} from "../controllers/studentController.js"


const router = express.Router()

router.get("/", getStudents)
router.post("/", createStudent,)
router.delete("/:id", deleteStudent,)
router.put("/:id", updateStudent)
router.get("/:id/grades", getStudentWithGrades)
router.get("/students-with-grades", getAllStudentsWithGrades)

export default router

