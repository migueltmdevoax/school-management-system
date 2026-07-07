import express from "express";
import { getAllergiesByStudent, createAllergy, deleteAllergy } from "./allergies.controller.js";
import { verifyToken }    from "../../middleware/authJWT.js";
import { authorizeRoles } from "../../middleware/authorizeRoles.js";

const router = express.Router();

router.get("/student/:studentId", verifyToken, authorizeRoles("admin", "teacher", "parent"), getAllergiesByStudent);
router.post("/",     verifyToken, authorizeRoles("admin", "teacher"), createAllergy);
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteAllergy);

export default router;