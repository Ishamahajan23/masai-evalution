import { useState } from 'react'
import './App.css'

// const credentials = {
//     "email":"bruce@wayne.com",
//     "password":"gotham123"
// }

function App() {
  const [form, setForm] = useState({});
  const [token, setToken] = useState("");
  

  const handleSubmit=async(e)=>{
      e.preventDefault();
      try{
         const res = await fetch("https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/login",{
            method:"POST",
            body:JSON.stringify(form),
         })
         const data =await res.json();
         if(data.token){
            setToken(data.token);
            setForm({});
            localStorage.setItem("token", data.token);
            alert("Login Successful")
            return;

         }
          alert("Login Failed")

      }catch(err){
        console.error(err);
        alert("Login Failed")
      }
  }

  const handleChange=(e)=>{
    const {name, value} = e.target;

    setForm(prev => ({...prev, [name]: value}));

  }

  return (
    <>

      <h1>Login By Email and Password</h1>
      {token ? <h2>Logged in Successfully. Token: {token}</h2> :  <form action="" onSubmit={handleSubmit}>
        <input type="email" name="email" value={form.email || ""} onChange={handleChange}/>
        <input type="password" name="password" value={form.password || ""} onChange={handleChange} />
        <button type="submit">Login</button>
      </form>}
     



    </>
  )
}

export default App
