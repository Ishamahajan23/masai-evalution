import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const defaultTime = 5 * 60;

function App() {
  const [time, setTime] = useState(defaultTime);
  const [isRunning, setIsRunning] = useState(false);
const [isEditing, setIsEditing] = useState(false);
const [inputValue, setInputValue] = useState("");


  useEffect(()=>{
    if(!isRunning || isEditing || time===0) return ;
    const intervalId= setInterval(()=>{

       setTime(prev=>{
        if(prev <=1){
          setIsRunning(false);
          return 0;
        }
        return prev-1;
       })
      },1000)

      return ()=> clearInterval(intervalId);




  }, [time, isRunning, isEditing])

  const minutes = String(Math.floor(time/60)).padStart(2,"0");
  const seconds = String(time%60).padStart(2,'0');


  const handleStartStop=()=>{
    if(time ===0){
      return;
    }
    setIsRunning(!isRunning);
  }

  const handleReset=()=>{
    setIsRunning(false);
    setTime(defaultTime);
  }

const confirmEdit=()=>{
  const newTime = Number(inputValue);
  if(!isNaN(newTime) && newTime >=0){
    setTime(newTime);
  }
  setIsEditing(false)
}

  return (
    <>
        <div>
          <h1>Timer App</h1>
          <div style={{display: "flex", justifyContent: "center", fontSize: "48px", alignItems: "center", gap:"3px"}}>
               <p onClick={()=>{
                setIsRunning(false);
                setIsEditing(true);
                setInputValue("");

               }}>

             {
              isEditing ?
              <input 
                type="number" 
                value={inputValue} 
                onChange={(e)=>{setInputValue(e.target.value)}} 
                onBlur={confirmEdit}
                onKeyDown={(e)=>e.key === "Enter" && confirmEdit()}
                autoFocus
                style={{ width: "40px", padding:"10px"}}
                
              />
              : 
              <span>{`${minutes}:${seconds}`}</span>
             }
          </p>
           
          </div>
          <div style={{display: "flex", justifyContent: "center", gap:"10px", marginTop:"20px"}}>
            <button onClick={handleStartStop}>
             { isRunning ? "Stop" : "Start"}
            </button>
            <button onClick={handleReset}>
             Reset
            </button>
          </div>


        </div>
    </>
  )
}

export default App
