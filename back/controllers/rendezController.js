
import errorHandler from "../error/error.js";
import { Rendez } from "../models/rendezVousSchema.js";
import { User  } from "../models/userSchema.js";
export const postRendez = async (req,res,next)=>{

    const{
        nomPatient,
        prenomPatient,
        dateRendezVous,
        emailPatient,
        email,  
        doctorNom,
        doctorPrenom
    } = req.body
    if(!nomPatient )
        return next(new errorHandler("Veuillez remplir le nom formulaire a",400))
    if(!prenomPatient )
        return next(new errorHandler("Veuillez remplir le prenom formulaire a",400))
    if(!email )
        return next(new errorHandler("Veuillez remplir le email formulaire a",400))
    if(!dateRendezVous )
        return next(new errorHandler("Veuillez remplir le date formulaire a",400))
    if(!nomPatient ||
        !prenomPatient ||
        !email ||
        !dateRendezVous ||
         !emailPatient
         ||
         !doctorPrenom
         || !doctorNom

        
        ){
            return next(new errorHandler("Veuillez remplir le formulaire a",400))
        }
        const DoctorFound = await User.find({email})
        console.log(DoctorFound)
       if(DoctorFound.length  ==0)
            return next (new errorHandler("Doctor not found",404))
        if(DoctorFound.length >1){
            return next(new errorHandler("Doctors conflit",404))
        }
        const isRendezVous =await Rendez.find({dateRendezVous})
        if(isRendezVous.length >0){
            return (
                next(new errorHandler("Date déja prise",403))
            )
        }
        const doctorId = DoctorFound[0]._id
      
        const RendezVous =await Rendez.create({nomPatient,
            prenomPatient,
            emailPatient,
            email,
            dateRendezVous,
            doctorNom,
            doctorPrenom
        })
        res.status(200).json({
            success:true,
            message:"Rendez vous envoye",
            RendezVous
        })
}
export const getAllRendezVous = async (req,res,next)=>{
    const RendezVous  = await Rendez.find({})
    res.status(200).json({
        success:true,
        RendezVous
    }) 
}
export const getRendezVous = async (req,res,next)=>{
    const {emailPatient} = req.body
    console.log(emailPatient)
    if(!emailPatient)
        return next(new errorHandler("Remplier ",400))
    const rendez =await Rendez.find({emailPatient})
    
    res.status(200).json({
        success:true,
        message:"Liste rendez vous",
        rendez
    })
}
export const UpdateRendezVousStatus = async (req,res,next)=>{
    const {id} = req.params

}
export const DeleteRendezVous = async (req,res,next)=>{
    const {id} = req.params
    const rendez =await Rendez.findById(id)
    await rendez.deleteOne()
    res.status(200).json({
        success:true,
        message:"Rendez vous supprimer"
    })
}