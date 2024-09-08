import express from "express";
import { patientRegister,loggoutPatient ,patientLogin} from "../controllers/patientController.js";
import { isPatienAuth } from "../utils/auth.js";

const router = express.Router()

router.post("/register",patientRegister)
router.post("/login",patientLogin)
router.get("/patient/loggout",isPatienAuth,loggoutPatient)
export default router