import express
from "express";

import {
  getGroups
} from "./groups.controller.js";



const router =
  express.Router();



// 🔥 GET GROUPS
router.get(
  "/",
  getGroups
);



export default router;