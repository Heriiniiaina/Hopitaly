import express from "express"
import {login, addAdmin, getAllDoctor, getUSerDetails, loggoutAdmin, addDoctor, DeleteDoctor} from "../controllers/userController.js"
import { isAdminAuth, isPatienAuth } from "../utils/auth.js"
import { getRendezVous } from "../controllers/userController.js"
import { getUser } from "../controllers/patientController.js"

const router = express.Router()


router.post("/login",login)
router.post("/admin/add",addAdmin)

router.post("/doctor/add",addDoctor)
router.get("/admin/doctors",getAllDoctor)
router.delete("/admin/deleteDoc/:id",DeleteDoctor)

router.get("/admin/me",isAdminAuth,getUSerDetails)
router.get("/patient/me",isPatienAuth,getUSerDetails)
router.get("/admin/loggout",isAdminAuth,loggoutAdmin)
router.post("/doctor/getRdv",getRendezVous)


export default router