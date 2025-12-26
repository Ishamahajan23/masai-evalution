import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

    useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const getDeviceType=()=>{
    if(size.width<768) "Mobile";
    else if(size.width<= 1024) "Tablet";
    else "Desktop"
  }

  return (
    <>
     <div className='flex justify-center items-center flex-col'>
      <h1 className='font-medium text-xl'>Display the current window dimensions</h1>
      <h2>
        width({size.width}) x  height({size.height})
      </h2>
      <p>{getDeviceType()}</p>
    </div>
     
    </>
  )
}

export default App
