import express from "express";
import { patientRegister,loggoutPatient ,patientLogin, getAllPatient,DeletePatient, getDoctor, getUser, updates} from "../controllers/patientController.js";
import { isPatienAuth } from "../utils/auth.js";
import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dbvn3zgls",
  api_key: "553813854841318",
  api_secret: "ZkzHaJlFYJQ0_wnFKgEEbCOPeJc",
});

// Configure Multer storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: 'patients',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage: storage });
const router = express.Router()

router.post("/register",upload.single('image'),patientRegister)
router.post("/login",patientLogin)
router.get("/patient/loggout",isPatienAuth,loggoutPatient)
router.get("/patients",getAllPatient)
router.get("/getDoc",getDoctor)
router.delete("/deletePat/:id",DeletePatient)
router.post("/me",getUser)
router.patch("/updates",updates)
export default router