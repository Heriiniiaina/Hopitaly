import mongoose from "mongoose";
//Soloina url mongo le process.env.MONGO_URI
export const dbConnect = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI,{
            dbName: "Hopital"
        })
        console.log("Database")
    } catch (error) {
        console.log("Error")
    }
}