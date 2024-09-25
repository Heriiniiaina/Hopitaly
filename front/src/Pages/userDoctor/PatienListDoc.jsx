import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { BiPencil, BiTrashAlt } from 'react-icons/bi';
import NavBarDoc from '../../components/NavBar/NavDoctor';
import FormDossier from '../Dossier/Form';
import { useNavigate } from 'react-router-dom';

const PatientDoc = () => {
    const navigate = useNavigate()
    const e = JSON.parse(sessionStorage.getItem("user"))
    console.log(e)
    const [patients,setPatients] = useState([])
 useEffect(()=>{
    try {
        const getDoctor = async ()=>{
           const email=e.email
            const doc = await axios.post("http://localhost:2000/api/user/doctor/getRdv",{email})
            console.log(doc.data.rendez)
            setPatients(doc.data.rendez)
        }
        getDoctor()
        
    } catch (error) {

    }
    console.log(patients)
 },[])
 const delet = async (id)=>{
    
        const del = await axios.delete(`http://localhost:2000/api/patient/deletePat/${id}`)
        console.log(del)
        window.location.reload()
 }
 const handleDeleteClick = (doctor) => {
    
    navigate("/doctor/patientForm",{
        state:{patientData:doctor}
    })
  };
  return (
    <div className="patientlist"  style={styles.patienList}>
        <NavBarDoc/>
          <div style={styles.container}>
      <h2 style={styles.title}>PATIENT</h2>
      <input type="text" placeholder="Search" style={styles.searchInput} />
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={{ padding: '10px' }}>#</th>
            <th style={{ padding: '10px' }}>Nom</th>
            <th style={{ padding: '10px' }}>Prenom</th>
            <th style={{ padding: '10px' }}>Email</th>
            
            
            
          </tr>
        </thead>
        <tbody>
          {patients.map((doctor, index) => (
            <tr key={doctor.id}>
              <td style={{ padding: '10px' }}>{index + 1}</td>
              <td style={{ padding: '10px' }}>{doctor.nomPatient} </td>
              <td style={{ padding: '10px' }}>{doctor.prenomPatient}</td>
              <td style={{ padding: '10px' }}>{doctor.phone}</td>
              <td style={{ padding: '10px' }}>{doctor.emailPatient}</td>
            <button style={styles.deleteButton} onClick={e=>handleDeleteClick(doctor.emailPatient)}><BiPencil/></button>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  
  );
};

const styles = {
  container: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
  },
  patienList:{
    display:"flex"
  },
  searchInput: {
    width: '100%',
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '16px',
    marginBottom: '20px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#4f46e5',
    color: 'white',
    padding: '10px',
  },
  td: {
    padding: '10px',
    borderBottom: '1px solid #ddd',
  },
  editButton: {
    backgroundColor: '#3b82f6',
    color: 'white',
    padding: '5px 10px',
    borderRadius: '4px',
    marginRight: '10px',
    border: 'none',
  },
  deleteButton: {
    backgroundColor: 'white',
    fontSize:"20px",
    padding: '5px 10px',
    borderRadius: '4px',
    border: 'none',
  },
};

export default PatientDoc;
