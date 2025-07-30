/* eslint-disable react-refresh/only-export-components */
import { Register } from './auth/Register'
import {Login} from './auth/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './Home'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { Organizer } from './application/Orgnizer'
import {createContext, useEffect, useRef, useState} from 'react'
import TajdeedLanding from './tajdeed-landing'
import { useTranslation } from 'react-i18next'
export const organizerContext = createContext()
export default function App() {
  const [isOrganizerRunning, setIsOrganizerRunning] = useState(false)
  const { i18n } = useTranslation();
  // useEffect(()=>{
  //   localStorage.setItem('organizer',isOrganizerRunning)
  //   console.log("organizer stored ", {isOrganizerRunning});
    
  // },[isOrganizerRunning])
  useEffect(() => {
    document.documentElement.dir = i18n.dir();
  }, [i18n, i18n.language]);

  return (
    <Router>
      {/* <FloatingIcons /> */}
      <organizerContext.Provider value={{isOrganizerRunning,setIsOrganizerRunning}}>
      {isOrganizerRunning && <Organizer></Organizer>}
      <Routes>
        <Route path="/" element={<TajdeedLanding/>}></Route>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/application' element={<ProtectedRoute><Organizer></Organizer></ProtectedRoute>}></Route>
      </Routes>

       </organizerContext.Provider>
    </Router>
  )
}


