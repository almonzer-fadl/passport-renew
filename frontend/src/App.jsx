import './App.css'
import { Register } from './auth/Register'
import {Login} from './auth/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { Home } from './auth/Home'
import { ProtectedRoute } from './auth/ProtectedRoute'
import { FloatingIcons } from './components/FloatingIcons'
import { Organizer } from './application/Orgnizer'

function App() {

  return (
    <Router>
      <FloatingIcons />
      <Organizer></Organizer>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/home" element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      </Routes>
    </Router>
  )
}

export default App
