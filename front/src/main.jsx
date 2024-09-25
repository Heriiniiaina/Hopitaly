import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import App from './App.jsx';
import { Toaster } from "react-hot-toast";
import { AuthProvider, useAuth } from './Auth/AuthContext.jsx';
import PrivateRoute from './Auth/PrivateRoute.jsx'; 
import ProtectedRoute from './Auth/ProtectedRoute.jsx';
import AdminDoctor from './Pages/admin/AdminDoctor.jsx';
import AdminPatient from './Pages/admin/AdminPatient.jsx';

import PatientDash from './Pages/PatientDash/PatientDash.jsx';
import FormDossier from './Pages/Dossier/Form.jsx';
import Doctor from './Pages/userDoctor/Doctor.jsx';
import PatientDoc from './Pages/userDoctor/PatienListDoc.jsx';
import FirstPage from './Pages/firstPage/PageOne/src/Firstpage.jsx';
import Logout from './components/Logout.jsx';
import Patient from './Pages/userPatient/Patient.jsx';

const route = createBrowserRouter([
  {
    path: '/auth',
    element: 
    

      <App.AppLog />,
  
  },
  {
    path: '/auth_user',
    element: 
    

      <App.AppUserLog />,

    
  },
  {
    path: '/',
    element: <FirstPage/>
  },
 
  {
    path: '/user&patient',
    element: (
      

        <App.AppPatientPage />
    
      
    ),
  },
  {
    path : "/user&patient/dossier&medical",
    element : <App.AppPatientDossierM/>
  },
  {
    path:"/user&patient/rendez",
    element:
      <Patient/>
    
  },
  {
    path: '/admin',
    element: (
        <App.AppAdminPage />
    ),
   
  },
  {
    path: "/admin/doctor",
    element:<AdminDoctor/>
  },
  {
    path: "/admin/patient",
    element:<AdminPatient/>
  },
  {
    path: "/admin/patientDash",
    element:<PatientDash/>
  },
  {
    path:"/doctor",
    element:<Doctor/>
  },
  {
    path:"/doctor/patient",
    element:<PatientDoc/>
  },
  {
    path:"/doctor/patientForm",
    element:<FormDossier/>
  },{
    path:"/logout",
    element:<Logout/>
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    
      <Toaster />
      <RouterProvider router={route} />
    
  </StrictMode>,
);
