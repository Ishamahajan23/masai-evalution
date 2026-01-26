import { useEffect, useState } from 'react'
import './App.css'


const patients = [
    {
    id: 1,
    name: "Ramesh Kumar",
    age: 45,
    problem: "Fever and cough",
    doctor: "Dr. Sharma"
    },
    {
    id: 2,
    name: "Anita Singh",
    age: 32,
    problem: "Headache",
    doctor: "Dr. Mehta"
    },
    {
    id: 3,
    name: "Rahul Verma",
    age: 28,
    problem: "Back pain",
    doctor: "Dr. Rao"
    },
    {
    id: 4,
    name: "Suman Patel",
    age: 60,
    problem: "Blood pressure",
    doctor: "Dr. Shah"
    }
];


function App() {
  const [ patientIndex, setPatientIndex ] = useState(0);
  const [patientsData, setPatientsData] = useState(() => {
    const storedData = localStorage.getItem("patientsData");
    return storedData ? JSON.parse(storedData) : patients;
  });

  const [time, setTime] = useState(null);

  const handlePrev=()=>{
    setPatientIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  }

  const handleNext=()=>{
    setPatientIndex((prevIndex) => Math.min(prevIndex + 1, patients.length - 1));

  }

  const handleStatus=(id)=>{
    const updatedPatients = patientsData.map((patient) => {
      if (patient.id === id) {
        return { ...patient, status: "treated" };
      }
      return patient;
    });
    localStorage.setItem("patientsData", JSON.stringify(updatedPatients));
    setPatientsData(updatedPatients);
  }

  useEffect(() => {
    if (!time) return;
    
    const [minutes, seconds] = time.split(':').map(Number);
    let totalSeconds = minutes * 60 + seconds;

    const intervalId = setInterval(() => {
      totalSeconds--;
      
      if (totalSeconds < 0) {
        totalSeconds = 0;
      }
      
      const min = Math.floor(totalSeconds / 60);
      const sec = totalSeconds % 60;
      const timeString = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
      
      localStorage.setItem("timer", timeString);
      setTime(timeString);
      
      if (totalSeconds === 0) {
        clearInterval(intervalId);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [time])
  const handleStart = () => {
    if (time) return;
    const savedTimer = localStorage.getItem("timer");
    const initialTime = savedTimer && savedTimer !== "00:00" ? savedTimer : "15:00";
    setTime(initialTime);
    localStorage.setItem("timer", initialTime);
  }

  return (
    <>

     <div className='min-h-screen bg-gray-50 flex flex-col items-center gap-8 py-10'>
      <div className='flex flex-col justify-center items-center gap-4'>
              <h1 className='text-3xl'>Hospital Patient Tickets</h1>
       <button onClick={handleStart} type='button' className={`bg-black py-1 px-2 text-white rounded-xl ${time ? "bg-gray-500 cursor-not-allowed" : ""}`}>{time ? "Consultation Started" : "Start Consultation"}</button>
        <span className="text-lg font-mono">
          {time === "00:00" ? "Consultation Ended" : time || "Not Started"}
        </span>
      </div>


     {time && time !== "00:00" && (
      <div className='p-4 flex flex-col items-center gap-4'>
        <div className='flex items-center gap-4'>
          <button 
            onClick={handlePrev} 
            type='button' 
            className='bg-blue-500  text-white px-4 py-1 rounded-lg disabled:bg-gray-400'
            disabled={patientIndex === 0}
          >
            ← Previous
          </button>
          
          <span className='text-lg font-semibold'>
            Patient {patientIndex + 1} of {patientsData.length}
          </span>
          
          <button 
            onClick={handleNext} 
            type='button'
            className='bg-blue-500 text-white px-4 py-1 rounded-lg disabled:bg-gray-400'
            disabled={patientIndex === patientsData.length - 1}
          >
            Next →
          </button>
        </div>
        
        <div className='border-2 border-gray-300 rounded-lg p-6 bg-white shadow-md max-w-md w-full'>
          <h2 className='font-bold text-xl mb-3'>Name: {patientsData[patientIndex].name}</h2>
          <p className='mb-2'><strong>Age:</strong> {patientsData[patientIndex].age}</p>
          <p className='mb-2'><strong>Problem:</strong> {patientsData[patientIndex].problem}</p> 
          <p className='mb-2'><strong>Doctor:</strong> {patientsData[patientIndex].doctor}</p>
          <p className='mb-4'><strong>Status:</strong> {patientsData[patientIndex].status || "Not Treated"}</p>
          <button 
            onClick={() => handleStatus(patientsData[patientIndex].id)} 
            className={`rounded-lg py-2 px-4 text-white font-medium ${
              patientsData[patientIndex].status === "treated" 
                ? "bg-green-500 cursor-not-allowed" 
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={patientsData[patientIndex].status === "treated"}
          >
            {patientsData[patientIndex].status === "treated" ? "Already Treated" : "Mark as Treated"}
          </button>
        </div>
      </div>
     )}
     {time === "00:00" && (
        <div className='bg-gray-100 rounded-lg p-6 max-w-md'>
          <h2 className='text-2xl font-bold text-center mb-4 text-green-600'>Consultation Completed</h2>
          <div className='space-y-2'>
            <p><strong>Total Patients:</strong> {patientsData.length}</p>
            <p><strong>Treated:</strong> {patientsData.filter(patient => patient.status === "treated").length}</p>
            <p><strong>Not Treated:</strong> {patientsData.filter(patient => patient.status !== "treated").length}</p>
            <p><strong>Pending:</strong> {patientsData.filter(patient => !patient.status).length}</p>
          </div>
          <button 
            onClick={() => {
              setTime(null);
              setPatientIndex(0);
              localStorage.removeItem("timer");
            }}
            className='mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg'
          >
            Start New Session
          </button>
        </div>
     )}


     </div>


    </>
  )
}

export default App
