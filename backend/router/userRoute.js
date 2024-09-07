import express from "express"
import {patientRegister,login, addAdmin, getAllDoctor, getUSerDetails, loggoutAdmin, loggoutPatient, addDoctor} from "../controllers/userController.js"
import { isAdminAuth, isPatienAuth } from "../utils/auth.js"

const router = express.Router()

router.post("/patient/register",patientRegister)
router.post("/login",login)
router.post("/admin/add",addAdmin)
router.post("/doctor/add",addDoctor)
router.get("/doctors",getAllDoctor)

router.get("/admin/me",isAdminAuth,getUSerDetails)
router.get("/patient/me",isPatienAuth,getUSerDetails)
router.get("/admin/loggout",isAdminAuth,loggoutAdmin)
router.get("/patient/loggout",isPatienAuth,loggoutPatient)

export default router