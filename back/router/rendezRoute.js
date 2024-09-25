import { getAllRendezVous, getRendezVous, postRendez } from "../controllers/rendezController.js";
import express from "express"
import { isAdminAuth, isPatienAuth } from "../utils/auth.js";

const router =express.Router()

router.post("/post",postRendez)
router.get("/get",getAllRendezVous)
router.post("/getRdv",getRendezVous)
export default router