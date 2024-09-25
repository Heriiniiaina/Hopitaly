import { useState ,useEffect} from 'react'
import './Firstpage.css'
import CanvasComponent from './CanvasComponent.jsx'
import { Link, useNavigate } from 'react-router-dom'

function FirstPage() {
  const [count, setCount] = useState(0)
  const navigate = useNavigate()
  useEffect(()=>{
    
      const log = JSON.parse(sessionStorage.getItem("user"))
      console.log(log)
      if(log && log.role =="Admin")
        return navigate("/admin")
      if(log && log.role =="Patient")
        return navigate("/patient")
      if(log && log.role =="Doctor")
        return navigate("/doctor")

  },[])
  return (
    <>
    <CanvasComponent/>
    <div className="container">
      <div className="choisir">
          <div className="brand">
            <h1>+Symptoscan</h1>
          </div>

          <h2>GET STARTED</h2>
          <p>what is your account type?</p>
          <div className="cards">
            <div className="card">
                <div className="first-content Doc">
                <Link to="/auth"><span>Doctor</span></Link>
                </div>
                <div className="second-content Doc2">
                <Link to="/auth"><span>Doctor</span></Link>
                </div>
            </div>

            <div className="card">
                <div className="first-content p1">
                <Link to="/auth_user"><span>Patient</span></Link>
                </div>
                <div className="second-content p2">
                <Link to="/auth_user"><span>Patient</span></Link>
                </div>
            </div>


          </div>
          <div> <code>@alright reserved</code> </div>
         
        
      </div>
      <div className="carou">
      </div>
    </div>
    </>
  )
}

export default FirstPage
