import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todo, setTodo] = useState("")
  const [list, setList] = useState(localStorage.getItem("todoList") ? JSON.parse(localStorage.getItem("todoList")) : []);

  const handleSubmit=(e)=>{
    e.preventDefault();
    localStorage.setItem("todoList", JSON.stringify([...list, todo]));
    setList([...list, todo]);
    setTodo("");
  }

  const handleRemove=(index)=>{
      const newList = list.filter((_, i) => i !== index);
      localStorage.setItem("todoList", JSON.stringify(newList));
      setList(newList);
  }

  return (
    <>
      <div>
        <h1>Todo List</h1>
        <input type="text" name="todo" onChange={(e)=>setTodo(e.target.value)} value={todo}/>
        <button onClick={handleSubmit}>Add Todo</button>
      </div>
      <div >
        <h2>Todo Items:</h2>
        <ol style={{display:"flex", flexDirection: "column", gap: "5px"}}>
          {list.map((item, index)=>(
            <li key={index} style={{display:"flex", gap:"12px"}}>{index+1}:  {item} <button type='button' onClick={()=>handleRemove(index)}>remove</button></li>
          ))}
        </ol>
      </div>
    </>
  )
}

export default App
