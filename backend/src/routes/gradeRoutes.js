import express from "express"
import {
    getGrades,
    createGrade,
    updateGrade,
    deleteGrade,
    getGradesByStudent
} from "../controllers/gradeController.js"

const router = express.Router()

router.get("/", getGrades)
router.post("/", createGrade,)
router.put("/:id", updateGrade,)
router.delete("/:id", deleteGrade,)
router.get("/student/:studentdId", getGradesByStudent)

export default router