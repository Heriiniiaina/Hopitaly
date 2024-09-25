import React, { useState} from 'react';
import { useNavigate,Link } from "react-router-dom";
import './nav.css';
import { FaHeartbeat, FaStream } from "react-icons/fa";
import {FaFolderClosed} from "react-icons/fa6"
import { FaCalendar } from "react-icons/fa";
import { BiGridAlt, BiStats, BiCog, BiLogOut } from "react-icons/bi";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function NavBarDoc() {
    const [activeIndex, setActiveIndex] = useState(1);
    const [indiTop, setIndiTop] = useState('14%');

    const navigate = useNavigate();

    //Get index : 
    const ip = useLocation();
    const activNav = (ip) => {
      switch (ip) {
        case "/doctor":
          setActiveIndex(1);
          break;
        case "/doctor/patient":
          setActiveIndex(2);
          break;
        case"/logout":
            navigate("/")
            break
        default:
          setActiveIndex(1);
          break;
      }
    };

    useEffect(() => {
        activNav(ip.pathname)

        return () => {
            console.log("chargement ou netoyage")
        }
    }, [ip]);

    

    const handleClick = (index) => {
         setActiveIndex(index);
        switch(index){
            case 1 : 
                navigate("/doctor");
                break;
            case 2 : 
                navigate("/doctor/patient");
        }
        activNav();  
    };

    return (
        <>
            <nav className='navT'>
                <ul>
                    <li className="burger"><a href="#"><FaStream /></a></li>
                    <li className={`${activeIndex === 1 ? 'Active' : ''}`} onClick={() => handleClick(1)}><a href="#"><FaCalendar /></a></li>
                    <li className={activeIndex === 2 ? 'Active' : ''} onClick={() => handleClick(2)}><a href="#"><FaFolderClosed /></a></li>
                    <li className={activeIndex === 3 ? 'Active' : ''} onClick={() => handleClick(3)}><a href="#"><FaHeartbeat /></a></li>
                    <li className={activeIndex === 4 ? 'Active' : ''} onClick={() => handleClick(4)}><a href="#"><FaCalendar /></a></li>
                    <div className="indi" style={{ top: indiTop }}></div>
                </ul>
                <div className="ambany">
                    <a href="#"><BiCog /></a>
                    <Link to="/logout"> <a href="#"><BiLogOut /></a></Link> 
                </div>
            </nav>
        </>
    );
}

export default NavBarDoc;
