import React, {useEffect, useState} from "react";

import "../userPatient/CalendarPatient.css"
import axios from "axios"
import { FullCalendar } from "../../components/Calendar/index.global.js";
import {useNavigate} from "react-router-dom"

import NavBar from "../../components/NavBar/Nav.jsx";
import SelectName from "../../components/Select/SelectNm.jsx";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send.js"
import TableList from "../../components/TableList/TableList.jsx";
import toast from "react-hot-toast";
import NavBarDoc from "../../components/NavBar/NavDoctor.jsx";




let Doctor = () => {
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
    
    if(!admin || admin.role !="Doctor"){
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
        console.log(e)
        if(e.email){
          const email = e.email
          console.log("emeil=>"+ email)
          const res = await axios.post("http://localhost:2000/api/user/doctor/getRdv",{email})
          if(res) setRendez(res.data.rendez)
        }
        
        
      } catch (error) {
        console.log(error)
      }
    }
    getRdv()
  },[patient])
  console.log(rendez)
 //console.log(rendez)
 
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
        title: `Rendez vous avec le patient ${rdv.nomPatient} ${rdv.prenomPatient}`,
        start: rdv.dateRendezVous,
      })),
      
    });

    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, [rendez]);
 

  
 

 
    
  
  return (
    <>
      <div className="patientPageContainer">
        {/* navbar */}
        <div className="logo">
          <p>+</p>
        </div>
        <NavBarDoc />

        {/* content */}
        <div className="contentContainer">
          <h2 className="title">Mes Rendez-vous</h2>
          <div className="calenSection">
            <div className="containerCalen">
              <div id="calendar" style={{ width: "100%" }}></div>
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

export default Doctor;