import { Router }         from "express";
import { verifyToken }    from "../../middleware/authJWT.js";
import { authorizeRoles } from "../../middleware/authorizeRoles.js";
import {
  createIncident,
  getAllIncidents,
  deleteIncident,
} from "./incidents.controller.js";

const router = Router();

router.get("/",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  getAllIncidents
);

router.post("/",
  verifyToken,
  authorizeRoles("admin", "teacher"),
  createIncident
);

router.delete("/:id",
  verifyToken,
  authorizeRoles("admin"),
  deleteIncident
);

export default router;