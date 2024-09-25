import React, { useEffect, useState } from "react";
import "./Form.css"
import { Header } from "./HeaderForm.jsx"
import NavBar from "../../components/NavBar/Nav.jsx";
import { useLocation } from "react-router-dom";
import axios from "axios";
export default function FormDossier(){
    const location = useLocation()
    const {patientData} = location.state
    console.log(patientData)
    const [patient,setPatient] = useState({})
    const [tension,setTension] = useState()
    const [temperature,setTemperature] = useState()
    const [cardiaque,setCardiaque] = useState()
    const [poids,setPoids] = useState()
    const [prescription,setPrescription] =useState()
    const [motif,setMotif]= useState()
    useEffect(()=>{

        axios.post("http://localhost:2000/api/patient/me",{email:patientData})
        .then(res=>setPatient(res.data.user))
        .catch(err=>console.log(err))
    },[patientData])
    console.log(patient)
    const id = patient._id
    const onUpdate = async (e)=>{
        e.preventDefault()
        
        try {
           const res = await axios.patch("http://localhost:2000/api/patient/updates",{tension,temperature,cardiaque,poids,motif,prescription,id})
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <>
            <div className="dossier">
            <NavBar/>
            <div class="form">

                <form action="" id="form1" onSubmit={onUpdate}>
                    <div className="col1">
                        
                        <div className="twoinlab">

                            <div className="inlab">
                                <label htmlfor="">Poids</label>
                                <input type="number" placeholder="0kg" onChange={e=>setPoids(e.target.value)}/>
                            </div>
                            <div className="inlab">
                                <label htmlfor="">Fréquence cardiaque </label>
                                <input type="number" placeholder="0bpm" onChange={e=>setCardiaque(e.target.value)}/>
                            </div>
                        </div>
                        
                        <div className="inlab">
                            <label htmlForfor="">Temperature</label>
                            <input type="number" placeholder="0°c" onChange={e=>setTemperature(e.target.value)}/>
                        </div>
                        <div className="inlab">
                            <label htmlfor="">Tension Arterielle</label>
                            <input type="text" placeholder="120/80" onChange={e=>setTension(e.target.value)}/>
                        </div>
                       

                      

                    </div>
                    
                    <div className="col2">
                        <div className="inlab">
                            <label htmlfor="">Motif de la Consultation</label>
                            <textarea type="text" style={{height:"300px", width:"100%",padding: "16px",border: "none",borderRadius: "8px",boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}} placeholder="Motif de la Consultation" onChange={e=>setMotif(e.target.value)} />
                        </div>
                    
                        <div className="inlab">
                            <label htmlfor="">Prescription :</label>
                            <textarea type="text" style={{height:"300px", width:"100%",padding: "16px",border: "none",borderRadius: "8px",boxShadow:"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px"}} placeholder="Motif de la Consultation" onChange={e=>setPrescription(e.target.value)}/>
                        </div>
                        
                        <div className="inlab">
                            <label htmlfor=""style={{opacity: 0}}>vide</label>
                            <input type="submit" id="submit" value="Envoyer"/>
                        </div>
                        
                    </div>
                </form> 
            </div>
            </div>
           
        </>
    )        
}