/* eslint-disable react-refresh/only-export-components */
import { Register } from './auth/Register'
import {Login} from './auth/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './auth/Home'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { FloatingIcons } from './components/FloatingIcons'
import { Organizer } from './application/Orgnizer'
import {createContext, useEffect, useRef, useState} from 'react'
export const organizerContext = createContext()
export default function App() {
  const [isOrganizerRunning, setIsOrganizerRunning] = useState(false)
  // useEffect(()=>{
  //   localStorage.setItem('organizer',isOrganizerRunning)
  //   console.log("organizer stored ", {isOrganizerRunning});
    
  // },[isOrganizerRunning])
  

  return (
    <Router>
      {/* <FloatingIcons /> */}
      <organizerContext.Provider value={{isOrganizerRunning,setIsOrganizerRunning}}>
      {isOrganizerRunning && <Organizer></Organizer>}
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home/></ProtectedRoute>}></Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/application' element={<ProtectedRoute><Organizer></Organizer></ProtectedRoute>}></Route>
      </Routes>

       </organizerContext.Provider>
    </Router>
  )
}


