import { TextField } from '@mui/material'
import React,{useState} from 'react'
import axios from "axios"

import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom'
export default function Login() {
    const navigate = useNavigate()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const onSubmit = async(e)=>{
        e.preventDefault()
       try {
           const res= await axios.post("http://localhost:2000/api/user/login",{email,password})
           const role = res.data.user.role
           if(role=="Admin")
                return navigate("/admin")
            if(role=="Patient")
                return navigate("/patient")
            if(role=="Doctor")
                return navigate("/doctor")
       } catch (error) {
            toast.error(error.response.data.message)
       }
    }
  return (
    <>
        <div className="formLogin">
            <h3>Se connecter</h3>
            <form action="" onSubmit={onSubmit}>
                <TextField placeholder='email' required onChange={e=>setEmail(e.target.value)}/>
                <TextField placeholder='password' type="password" required onChange={e=>setPassword(e.target.value)}/>
                <TextField type="submit" value="Se connecter"/>
            </form>
        </div>
    </>
  )
}
