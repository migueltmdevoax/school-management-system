import express from "express"
import {
    getAdmissions,
    createAdmission,
    updateAdmission,
    deleteAdmission,
} from "../controllers/admissionController.js"

const router = express.Router()

router.get("/", getAdmissions)
router.post("/", createAdmission,)
router.put("/:id", updateAdmission,)
router.delete("/:id", deleteAdmission,)
router.post("/:id/convert", convertToStudent)

export default router