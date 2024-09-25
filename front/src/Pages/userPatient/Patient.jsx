import React, {useEffect, useState} from "react";
import "./Patient.css";
import "./CalendarPatient.css"
import axios from "axios"
import { FullCalendar } from "../../components/Calendar/index.global.js";
import {useNavigate} from "react-router-dom"

import NavBar from "../../components/NavBar/Nav.jsx";
import SelectName from "../../components/Select/SelectNm.jsx";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send.js"
import TableList from "../../components/TableList/TableList.jsx";
import toast from "react-hot-toast";




let Patient = () => {
  const navigate = useNavigate()
  const [patient,setPatient] = useState({})
  const [rendez,setRendez] = useState([])
  const [doc,setDoc] = useState([])
  const [selectedUser, setSelectedUser] = useState(null);
  const [date,setDate] = useState()
  const handleChange = (event) => {
    const userId = event.target.value;
    const user = doc.find(u => u._id === userId);
    setSelectedUser(user);
   
  };
  console.log(selectedUser)
  useEffect(()=>{
    const admin = JSON.parse(sessionStorage.getItem("user"))
    
    if(!admin || admin.role !="Patient"){
      return navigate("/auth_user")
    }
    
    setPatient(admin)
    
  },[])
  
  //console.log(patient)
  let e = sessionStorage.getItem("user")
  e = JSON.parse(e)
  useEffect(()=>{
    const getRdv = async()=>{
      try {
       
        if(e.email){
          const res = await axios.post("http://localhost:2000/api/rendez/getRdv",{
            emailPatient:e.email
          })
          if(res) setRendez(res.data.rendez)
        }
        
        
      } catch (error) {
        console.log(error)
      }
    }
    getRdv()
  },[patient])
  
 //console.log(rendez)
  useEffect(()=>{
      const getDoc = async (req,res,next)=>{
        try {
          const res = await axios.get("http://localhost:2000/api/patient/getDoc")
          
          setDoc(res.data.doc)
        } catch (error) {
            console.log(error)
        }
      }
      getDoc()
  },[])
  //console.log(doc)
  useEffect( () => {
    
    var calendarEl = document.getElementById("calendar");
   
  
    var calendar = new FullCalendar.Calendar(calendarEl, {
      headerToolbar: {
        left: "prevYear,prev,next,nextYear today",
        center: "title",
        right: "dayGridMonth,dayGridWeek,dayGridDay",
      },
      initialDate: new Date(),
      navLinks: true, // can click day/week names to navigate views
      editable: true,
      dayMaxEvents: true, // allow "more" link when too many events
      events: rendez.map((rdv) => ({
        title: `Rendez vous avec Dr. ${rdv.doctorNom} ${rdv.doctorPrenom}`,
        start: rdv.dateRendezVous,
      })),
      
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [rendez]);
  const postRdv = async(e)=> {
    e.preventDefault()
      try {
        const a = {nomPatient:patient.nom,prenomPatient:patient.prenom,emailPatient:patient.email,email:selectedUser.email,dateRendezVous:date}
        console.log(a)
          const res = await axios.post("http://localhost:2000/api/rendez/post",{nomPatient:patient.nom,prenomPatient:patient.prenom,emailPatient:patient.email,email:selectedUser.email,dateRendezVous:date,doctorNom:selectedUser.nom,doctorPrenom:selectedUser.prenom})
          console.log(res)
          toast.success(res.data.message)
      } catch (error) {
          toast.error(error.response.data.message)
      }
  }

  
 

  const columnsTableList = [
    { field: "lastName", headerName: "Last name", width: 180 },
    {field: "fonction", headerName: "Fonction", width: 140},
    {field: "heure", headerName:"Heure", width:115}
  ];
  // DATA à modifier en f* BD
  const elemntsTableList = [
    { id: 1, lastName: "Snow", fonction: "Pediatre", heure: 12 },
    { id: 2, lastName: "Lannister", fonction: "Dentiste", heure: 7 },
    { id: 3, lastName: "Lannister", fonction: "Gyneco", heure: 9 },
    { id: 4, lastName: "Stark", fonction: "Generale", heure: 12 },
    { id: 5, lastName: "Targaryen", fonction: "Dentiste", heure: 21 },
    { id: 6, lastName: "Melisandre", fonction: "Dentiste", heure: 12 },
    { id: 7, lastName: "Clifford", fonction: "Gyneco", heure: 14 }
  ];
    
  
  return (
    <>
      <div className="patientPageContainer">
        {/* navbar */}
        <div className="logo">
          <p>+</p>
        </div>
        <NavBar />

        {/* content */}
        <div className="contentContainer">
          <h2 className="title">Mes Rendez-vous</h2>
          <div className="calenSection">
            <div className="containerCalen">
              <div id="calendar" style={{ width: "100%" }}></div>
            </div>
            <div className="containerPostRdv">
              <h3>Postuler un rendez-vous</h3>
              {/* formulaire */}
              <form action="#" width="100%" className="formSection" onSubmit={postRdv}>
              <select id="utilisateur-select" value={selectedUser} defaultValue="" onChange={handleChange}>
                  <option value="" disabled>Choisissez un doctuer</option>
                  {doc.map((user) => (
                    <option key={user._id} value={user._id}>
                      {user.prenom} {user.nom}
                    </option>
                  ))}
      </select>
                <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                  <input className="inputDate" type="date" name="pDateRdvUser" id="pDateRdvUser" onChange={e=>setDate(e.target.value)}/>
                  <Button type="submit" sx={{textTransform: "none", marginTop: 2.4, marginLeft: 7}} variant="contained" endIcon={<SendIcon />}>
                    Envoyer
                  </Button>
                </div>                
              </form>
              {/* List RDV SUGGESTION */}
              <h3 style={{marginTop: 20, marginBottom: 30}}>Disponible Aujourd'hui</h3>
              <TableList Columns={columnsTableList} Arrows={elemntsTableList} Height={310} PageSizeOptions={[3, 8]} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Patient;