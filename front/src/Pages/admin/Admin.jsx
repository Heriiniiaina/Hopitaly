import React,{useEffect} from 'react'
import {useNavigate} from "react-router-dom"
import "./Admin.css"


// a remplace NAV BAR TMP
import DoctorList from './DoctorList.jsx'
import AddDoctor from './AddDoctor.jsx'
import NavBar from '../../components/NavBar/Nav.jsx'
import PatientList from './Patient/PatientList.jsx'
import AddPatient from './Patient/AddPatient.jsx'
import NavBarD from '../../components/NavBar/NavAdmin.jsx'


let Admin = () => {
  const navigate = useNavigate()
  useEffect (()=>{
    const admin = JSON.parse(sessionStorage.getItem("user"))
    if(!admin)
       return navigate("/")
    if(admin.role =="Patient")
        return navigate("/user&patient")
  })
  
  return (
    <div className="AdminPageContainer">
      {/* navbar */}
        <div className="logo">
          <p>+</p>
        </div>
        <NavBarD/>
      {/* content */}
      <div className="contentContainer" >
      <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5', // Couleur de fond optionnelle
      }}
    >
      <div style={{ display: 'flex' ,alignItems:"center", gap: '30px' }}>
        <DoctorList />
        <AddDoctor />
      </div>
    </div>
      </div>
    </div>
  );
}

export default Admin
