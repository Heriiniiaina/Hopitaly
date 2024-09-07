import { useState } from 'react'

import {createBrowserRouter,RouterProvider} from "react-router-dom"
import './App.css'
import Login from './Pages/Login'
import AdminDahsboard from './Pages/Dashboard/AdminDahsboard'
import PatientDashboard from './Pages/Dashboard/PatientDashboard'
import DoctorDashboard from './Pages/Dashboard/DoctorDashboard'
const routes = createBrowserRouter([
  {
    path:"/",
    element:<Login/>
  },{
    path:"/admin",
    element:<AdminDahsboard/>
  },{
      path:"/patient",
      element:<PatientDashboard/>
  },
  {
    path:"/doctor",
    element:<DoctorDashboard/>
  }
])
function App() {
  return <RouterProvider router={routes}/>
}

 
export default App
