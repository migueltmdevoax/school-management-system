import { Router } from "express";
import * as controller from "./incidents.controller.js";

const router = Router();

// ✅ correcto
router.post("/", controller.createIncident);
router.get("/:id", controller.getIncidentsByStudent);

export default router;