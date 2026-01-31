import React from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './page/Dashboard'
import CityDetails from './page/CityDetails'
import Settings from './page/Settings'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Dashboard />}/>
        <Route path='/city/:cityName' element={<CityDetails />}/>
        <Route path='/settings' element={<Settings />}/>
      </Routes>  
    </>
  )
}

export default App
