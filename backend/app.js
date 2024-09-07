import express from "express"
import cors from 'cors'
import {config} from "dotenv"
import cookieParser from "cookie-parser"

import { dbConnect } from "./Database/DatabaseConnect.js"

import { errorMidleware } from "./error/error.js"
import userRoute from "./router/userRoute.js"
config({"path":"./config/config.env"})
const app = express()
app.use(cors({
    origin:[process.env.FRONT_URL],
    methods:["POST","GET","PUT","DELETE"],
    credentials: true
}))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true}))



app.use("/api/user",userRoute)
app.use(errorMidleware)

dbConnect()
export default app
