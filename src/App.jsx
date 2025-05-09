import { useEffect } from 'react'
import './Styles/main.css'
import About from './About'
import MainMenu from './pages/MainMenu'
import LoginScreen from './pages/LoginScreen'
import TechnicalDesign from './TechnicalDesign'
import CharacterScreen from './pages/CharacterScreen'
import VerificationEmailPage from './pages/VerificationEmailPage'
import DeathScreen from './DeathScreen'
import HowToPlay from './pages/HowToPlay'
import {
  Routes,
  Route
} from "react-router-dom"
import Canvas from './pages/Canvas'
import Register from './pages/Register'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

// for temp background
import { useLocation } from 'react-router-dom'

// axios.defaults.baseURL = 'http://localhost:8000'
// axios.defaults.withCredentials = true

function App() {

  const location = useLocation()

  return (
    <>
      <Toaster position='bottom-right' toastOptions={{ duration: 4500 }} />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/technical-design" element={<TechnicalDesign />} />
        <Route path='/' element={<MainMenu />} />
        <Route path='/login-screen' element={<LoginScreen />} />
        <Route path='/canvas' element={<Canvas level={0} />} />
        <Route path='/CharacterScreen' element={<CharacterScreen />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/verify-email' element={<VerificationEmailPage />} />
        <Route path='/death-screen' element={<DeathScreen />} />
        <Route path='/how-to-play' element={<HowToPlay />} />
      </Routes>
    </>
  )
}

export default App
