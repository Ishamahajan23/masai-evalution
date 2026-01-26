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
  const [status, setStatus] = useState("not treated");
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
    setStatus("treated");
  }

  useEffect(()=>{
    if(!time) return;
    let min=14;
    let sec=60;

    const intervalId = setInterval(() => {
      sec--;
      if (sec === 60) {
        min--;
        sec = 60;
      }
       localStorage.setItem("timer", `${min.toString().padStart(2, '15')}:${sec.toString().padStart(2, '0')}`);
      setTime(`${min.toString().padStart(2, '15')}:${sec.toString().padStart(2, '0')}`);
    }, 1000);

    return () => clearInterval(intervalId);

  },[time])
  const handleStart=()=>{
    if(time) return;
    setTime(localStorage.getItem("timer") || "15:00");
    localStorage.setItem("timer", "15:00");
   
  }

  return (
    <>

     <div className=' flex flex-col items-center gap-30 mt-10 '>
      <div className='flex flex-col justify-center items-center gap-4'>
              <h1 className='text-3xl'>Hospital Patient Tickets</h1>
       <button onClick={handleStart} type='button' className={`bg-black py-1 px-2 text-white rounded-xl ${time ? "bg-gray-500 cursor-not-allowed" : ""}`}>{time ? "Consultation Started" : "Start Consultation"}</button>
        <span>
          {time === "00:00" ? (setTime(null), "Consultation Ended") : time}
              
        </span>
      </div>


     {!time ||
      <div className='p-2 flex gap-4'>
        <button onClick={handlePrev} type='button' className=''>← prev</button>
         { patientsData.map((patient, index) => (
            <div key={patient.id}  className={`border-2 border-black m-2 p-2 bg-white ${index === patientIndex ? 'block' : 'hidden'}`}>
                <h2 className='font-bold text-lg'>Name: {patient.name}</h2>
                <p>Age: {patient.age}</p>
                <p>Problem: {patient.problem}</p> 
                <p>Doctor: {patient.doctor}</p>
                <p>Consultation Status: {patient.status || "not treated"}</p>
                <button onClick={()=>handleStatus(patient.id)} className={`rounded-xl py-1 px-2 text-sm text-white ${patient.status === "treated" ? "bg-green-500" : "bg-red-500"}`}>{ (patient.status === "treated" ? "Treated" : "Mark as Treated")}</button>
            </div>
         )) }
          <button onClick={handleNext} type='button'>next →</button>

      </div>
     }
     {time === "00:00" &&
        <div>
          <h2 className='text-2xl font-bold'>All Patients Treated</h2>
           <p>Total Patients Checked: {patientsData.length}</p>
           <p>Treated: {patientsData.filter(patient => patient.status === "treated").length}</p>
           <p>Not Treated: {patientsData.filter(patient => patient.status !== "treated").length}</p>
           <p>pending : {patientsData.filter(patient => !patient.status).length}</p>
        </div>
     }


     </div>


    </>
  )
}

export default App
