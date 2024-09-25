import express from "express"
import cors from 'cors'
import {config} from "dotenv"
import cookieParser from "cookie-parser"

import { dbConnect } from "./Database/DatabaseConnect.js"
import messageRoute from "./router/messageRoute.js"
import { errorMidleware } from "./error/error.js"
import userRoute from "./router/userRoute.js"
import patientRoute from "./router/patientRoute.js"

import rendezRoute from "./router/rendezRoute.js"
config({"path":"./config/config.env"})
const app = express()
app.use(cors({
    origin:["http://localhost:5173"],
    methods:["POST","GET","PUT","DELETE","PATCH"],
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use("/api/message",messageRoute)
app.use("/api/user",userRoute)
app.use("/api/patient",patientRoute)
app.use("/api/rendez",rendezRoute)
app.use(errorMidleware)

dbConnect()
export default app
