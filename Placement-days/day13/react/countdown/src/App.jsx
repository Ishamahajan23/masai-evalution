import { useState } from 'react'

import './App.css'
import { useEffect } from 'react'

// opic Focus: useEffect with intervals
// Scenario: Build a countdown timer. User enters minutes and seconds, clicks Start. Timer counts down and shows MM:SS format. Include Pause/Resume and Reset buttons. Show "Time's Up!" alert when reaches 00:00. Timer shouldn't count negative.
// Hidden Test: setInterval cleanup, preventing memory leaks, pausing/resuming intervals

function App() {
   const [min, setMin] = useState(0)
    const [sec, setSec] = useState(0)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        let interval = null
        if (isActive) {
            interval = setInterval(() => {
                if (sec > 0) {
                    setSec(sec - 1)
                }
                if (sec === 0) {
                    if (min === 0) {
                        clearInterval(interval)
                        setIsActive(false)
                        alert("Time's Up!")
                    } else {
                        setMin(min - 1)
                        setSec(59)
                    }
                }
            }, 1000)
        } else if (!isActive && sec !== 0) {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isActive, sec])

    const handleStart = () => {
        setIsActive(true)
    }

    const handlePauseResume = () => {
        setIsActive(!isActive)
    }

    const handleReset = () => {
        setIsActive(false)
        setMin(0)
        setSec(0)
    }

  return (
    <>
    <div>
         <div>
          {
             isActive ? <p style={{fontSize:"40px"}}>{min}:{sec}</p>:
         <>
        <input type="number" value={min} onChange={(e) => setMin(e.target.value)} />
        <span>:</span>
        <input type="number" value={sec} onChange={(e) => setSec(e.target.value)} />
        </>
       }

        
         </div>
         <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePauseResume}>Pause/Resume</button>
        <button onClick={handleReset}>Reset</button>
         </div>
    </div>

    </>
  )
}

export default App
