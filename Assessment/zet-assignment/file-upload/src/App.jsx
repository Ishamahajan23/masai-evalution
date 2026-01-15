import { useState } from 'react'
import './App.css'

function App() {
  const [file, setFile] = useState(null);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);
      const res = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/upload",{
        method:"POST",
        body: formData,
        
      })
      const data = await res.json();
      if(data.success){
      alert("File Uploaded Successfully")
      return;
      }

      alert("File Upload Failed")

    }catch(err){
      console.error(err);
      alert("File Upload Failed")
    }
      
  }

  return (
    <>
      <h1>File Upload Component</h1>
      <form action="" onSubmit={handleSubmit}>
        <input type="file" name="file" id="file" onChange={(e)=>setFile(e.target.files[0])} />
        <button type="submit">Submit</button>
      </form>

    </>
  )
}

export default App
