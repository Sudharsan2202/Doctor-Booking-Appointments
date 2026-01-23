import React, { useContext } from 'react'
import Login from './pages/Login'
  import { ToastContainer, toast } from 'react-toastify';
  import "react-toastify/dist/ReactToastify.css";


import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';

import AddDoc from './pages/Admin/AddDoc';
import DoctorsList from './pages/Admin/DoctorsList';
import AllAppointments from './pages/Admin/AllAppointments';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppintments from './pages/Doctor/DoctorAppintments';
import DoctorProfile from './pages/Doctor/DoctorProfile';

const App = () => {

  const {aToken} =useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)


  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer position="top-right" autoClose={3000}/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard/>} />
          <Route path='/all-appointments' element={<AllAppointments/>} />
          <Route path='/add-doctor' element={<AddDoc/>} />
          <Route path='/doctor-list' element={<DoctorsList/>} />
          
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppintments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) :(
    <>
    <Login />
    <ToastContainer/>
    </>
  )
}

export default App
