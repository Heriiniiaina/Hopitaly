import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './dash.css'
import NavBar from "../../components/NavBar/Nav";
import axios from 'axios';

function PatientDash() {
  const e= JSON.parse(sessionStorage.getItem("user"))
  const [patient,setPatient] = useState({})
  useEffect(()=>{
      try {
        const getUser = async ()=>{

          const res =await axios.post("http://localhost:2000/api/patient/me",{email:e.email})
          console.log(res)
          setPatient(res.data.user)
        }
          getUser()
      } catch (error) {
        console.log(error)
      }
  },[])
  return (
    <>
    <div className="dash">
    <NavBar />
    <div className="dashPatient">
 
      {/* About the Patient */}
      <div className="card">
        {/* Patient Picture */}
        <img src={e.image} alt="" className='user'/>
        <h3 className="nom">{patient.nom} {patient.prenom}</h3>
       
        {/* Additional Information */}
        <div className="info">
        
          <div className="height">
            <p>Height</p>
            <p className='cm'>173cm</p>
          </div>
          <div className="weight">
            <p>Weight</p>
            <p className='kg'>{patient.poids} kg</p>
          </div>
        </div>
      </div>
      <h3 className='prescr'>Prescribed Medications</h3>
      {/* Medications and Doctor */}
      <div className="medoc">
        {/* Medications */}
        <div className="scroll">
          <div>
            <div className='about'>
              <p className='nom'>Paracetamol</p>
              <p className="dose">500mg</p>
            </div>
            <p className='duration'>Until fever subsides</p>
            <p className='times'>once every 6 hours</p>
          </div>
          <div>
            <div className='about'>
              <p className='nom'>Ibuprofen</p>
              <p className="dose">400mg</p>
            </div>
            <p className='duration'><span>MON</span><span>TUE</span><span>WED</span></p>
            <p className='times'>Morning Noon Night</p>
          </div>
          <div>
            <div className='about'>
              <p className='nom'>Antiviral</p>
              <p className="dose">75mg</p>
            </div>
            <p className='duration'><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span></p>
            <p className='times'>Morning and Night</p>
          </div>
          <div>
            <div className='about'>
              <p className='nom'>Paracetamol</p>
              <p className="dose">500mg</p>
            </div>
            <p className='duration'>Until fever subsides</p>
            <p className='times'>once every 6 hours</p>
          </div>
        </div>
        {/* Doctor */}
       

      </div>
      <div className="maladies">
        <p>Examinations</p>
        <div className="there">
          <div className='grave'>
            <p className='date'>Tension art</p>
            <h3 className='nom'>{patient.tension}</h3>
            <p className='statut'></p>
          </div>
          <div className='moyen'>
            <p className='date'>card</p>
            <h3 className='nom'>{patient.cardiaque}</h3>
            
          </div>
          <div className='pas'>
            <p className='date'>Temperature</p>
            <h3 className='nom'>{patient.temperature}</h3>
           
          </div>

        </div>
        <div className="rdv">
          <p>Last appointment</p>
          <div className='un soon'>
            <p className='type'>Tonsillectomy</p>
            <p className='DateTime'><span className='date'>03 April 2024</span><span className='time'>02:17 PM</span></p>
          </div>
          <div className='un morning'>
            <p className='type'>Simple consultation</p>
            <p className='DateTime'><span className='date'>03 August 2024</span><span className='time'>08:00 AM</span></p>
          </div>
          <div className='un soon'>
            <p className='type'>Vaccine renewals</p>
            <p className='DateTime'><span className='date'>07 August 2024</span><span className='time'>03:45 PM</span></p>
          </div>
          <div className='un morning'>
            <p className='type'>Blood Pressure Measurement</p>
            <p className='DateTime'><span className='date'>12 August 2024</span><span className='time'>09:15 AM</span></p>
          </div>
          <div className='un soon'>
            <p className='type'>Simple consultation</p>
            <p className='DateTime'><span className='date'>31 August 2024</span><span className='time'>03:45 PM</span></p>
          </div>
          <div className='un morning'>
            <p className='type'>Dental scaling</p>
            <p className='DateTime'><span className='date'>09 September 2024</span><span className='time'>11:09 AM</span></p>
          </div>
        </div>
      </div>
    </div>
    </div>
     
    

    </>
  )
}

export default PatientDash
