import { useState } from 'react'
import './App.css'
import { useEffect } from 'react'

function App() {
  const [status, setStatus] = useState("")
  const [text, setText] = useState("Save");


  useEffect(()=>{
    
    if(!text) return;


    const timer = setTimeout(()=>{
       setStatus("Save");
    },2000)

    return ()=> clearTimeout(timer)
  },[text])

  return (
    <>

      <div className='flex justify-center items-center p-4 '>
        <input 
        type="textarea"
        placeholder='Write note.....'
        onChange={(e)=> {setText(e.target.value);     setStatus("Saving...");}}    
        className='p-2 border border-gray-300'
        />

        <p className={`p-2 border border-gray-200 ${status === "Saving..."? "text-blue-700 bg-blue-50": "text-green-700 bg-green-50"}`}>{status}</p>
      </div>

    </>
  )
}

export default App
