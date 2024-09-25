import mongoose from "mongoose";
import validator from "validator";

const rendez = mongoose.Schema({
    nomPatient:{
        type: String,
        required: true,
        minLength: [3,"Le nom doit au moins comporter 3 caracteres"]
    },
    prenomPatient:{
        type: String,
        required: true,
        minLength: [3,"Le prenom doit au moins comporter 3 caracteres"]
    },
    emailPatient:{
        type:String,
        required: true,
        validate: [validator.isEmail,"Veuillez entrer un email valide"]
    },

    email:{
        type:String,
        required: true,
        validate: [validator.isEmail,"Veuillez entrer un email valide"]
    },
    doctorNom:{
        type:String,
        required:true
    },
    doctorPrenom:{
        type:String,
        required:true
    },
    dateRendezVous:{
        type: Date,
        required:true
    },
    hasVisited:{
        type:Boolean,
     
        default:false
    },
    doctorId:{
        type:mongoose.Schema.ObjectId
     
    },
    patientId:{
        type:mongoose.Schema.ObjectId
     
    },
    status:{
        type:String,
        enum:["Ok","Non ok","En attente"],
        default:"En attente"
    }
})

export const Rendez = mongoose.model("Rendez",rendez)