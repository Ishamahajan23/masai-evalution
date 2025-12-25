
import './App.css'
import {  Routes, Route } from 'react-router-dom'
import AddeditList from './pages/AddeditList.jsx'

function App() {

  return (
    <>
    <Routes>
      <Route path='/' element={<AddeditList />}/>
    </Routes>
    </>
  )
}

export default App
