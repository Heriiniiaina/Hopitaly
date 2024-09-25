import errorHandler from "../error/error.js"
import { Patient } from "../models/patientSchema.js"
import { generateToken } from "../utils/jwtToken.js"


import {User} from "../models/userSchema.js"


export const patientRegister = async (req,res,next)=>{
    const { nom, prenom, email, phone, password, birth } = req.body;
  const image = req.file ? req.file.path : null;
    
    if(!nom || !prenom || !email || !phone || !birth || !password)
        return next(new errorHandler("Veuillez remplir le formulaire",400))
    const user = await Patient.findOne({email:email})
    if(user)
        return next(new errorHandler(`Un ${user.role} est deja enregistrer avec cette email`,400))
 
    try {
        
        await Patient.create({nom,prenom,email,phone,birth,password,image,role:"Patient"})
        /*generateToken(user,"Inscription reussi",200,res)*/
        res.status(200).json({
            success:true,
            message:"Inscription reussi"
           })
          console.log(pathDir)
    } catch (error) {
        if(error.name == "ValidationError"){
            const ValidatorError = Object.values(error.errors).map( err=> err.message)
            return next(new errorHandler(ValidatorError.join(" ,"),400))
        }
    }
}
export const patientLogin = async (req,res,next)=>{
    const {email,password} = req.body
    if(!email || !password)
        return next(new errorHandler("Veillez remplir le formulaire",400))
    const user = await Patient.findOne({email})
    if(!user)
        return next(new errorHandler("Email non valide",400))
    const isPassword = await user.comparePassword(password)
    console.log(isPassword)
    if(!isPassword)
        return next(new errorHandler("Mot de passe non valide",400))
   generateToken(user,`${user.role} login reussi`,200,res)
}
export const loggoutPatient = async (req,res,next)=>{
    res.status(200).cookie("patientToken","",{
        httpOnly:true,
        expires:new Date(Date.now())

    }).json({
        success:true,
        message:"Patient deconcté"
    })
}
export const getAllPatient = async (req,res,next)=>{
    const patient = await Patient.find({role:"Patient"})
    res.status(200).json({
        success:true,
        patient
    })
}
export const DeletePatient = async (req,res,next)=>{
    const {id} = req.params
    const doctor =await Patient.findById(id)
    await doctor.deleteOne()
    res.status(200).json({
        success:true,
        message:"Patient vous supprimer"
    })
}
export const getDoctor = async (req,res,next)=>{
    const doc = await User.find({role:"Doctor"})
    res.status(200).json({
        success:true,
        doc
    })
}
export const getUser =async (req,res,next)=>{
    const {email} = req.body
    if(!email)
        return next(new errorHandler("Remplier ",400))
    const user = await Patient.findOne({email})
    res.status(200).json({
        success:true,
        message:"User",
        user
    })
}
export const updates = async (req,res,next)=>{
    const {tension,temperature,cardiaque,poids,motif,heigth,prescription,id} = req.body
    if(!tension || !temperature || !cardiaque || !poids || !motif || !heigth || !prescription)
        return next(new errorHandler("Remplier ",400))
    const updata = {
        tension:tension,
        temperature:temperature,
        cardiaque:cardiaque,
        poids:poids,
        motif:motif,
        heigth:heigth,
        prescription:prescription,
    }
    await Patient.findByIdAndUpdate(id,
        { $set: updata }, 
        { new: true, runValidators: true }
    )
    res.status(200).json({
        success:true,
        message:"Donnees ajoute"
    })
}