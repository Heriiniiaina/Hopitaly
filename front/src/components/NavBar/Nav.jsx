import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './nav.css';
import { FaHeartbeat, FaStream } from "react-icons/fa";
import {FaFolderClosed} from "react-icons/fa6"
import { FaCalendar } from "react-icons/fa";
import { BiGridAlt, BiStats, BiCog, BiLogOut } from "react-icons/bi";

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function NavBar() {
    const [activeIndex, setActiveIndex] = useState(1);
    const [indiTop, setIndiTop] = useState('14%');

    const navigate = useNavigate();

    //Get index : 
    const ip = useLocation();
    const activNav = (ip) => {
      switch (ip) {
        case "/user&patient/rendez":
          setActiveIndex(1);
          break;
        case "/user&patient/dossier&medical":
          setActiveIndex(2);
          break;
        
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
        // setActiveIndex(index);
        switch(index){
            case 1 : 
                navigate("/user&patient/rendez");
                break;
            case 2 : 
                navigate("/user&patient/dossier&medical");
        }
        // activNav();  
    };

    return (
        <>
            <nav className='navT'>
                <ul>
                    <li className="burger"><Link to="/user&patient"><a href="#"><FaStream /></a></Link></li>
                    <li className={`${activeIndex === 1 ? 'Active' : ''}`} onClick={() => handleClick(1)}><a href="#"><FaCalendar /></a></li>
                    <li className={activeIndex === 2 ? 'Active' : ''} onClick={() => handleClick(2)}><a href="#"><FaFolderClosed /></a></li>
                    {/* <li className={activeIndex === 3 ? 'Active' : ''} onClick={() => handleClick(3)}><a href="#"><FaHeartbeat /></a></li> */}
                    {/* <li className={activeIndex === 4 ? 'Active' : ''} onClick={() => handleClick(4)}><a href="#"><FaCalendar /></a></li> */}
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

export default NavBar;
