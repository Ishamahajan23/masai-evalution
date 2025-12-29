import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tabs, setTabs] = useState("personal");

  return (
    <div >   
      <div className='flex gap-1'>
       {["personal", "account", "prefrence"].map((t)=>(
             <button onClick={()=>setTabs(t)}>{t}</button>
       ))} 
          </div>

      
    </div>
  )
}

export default App
