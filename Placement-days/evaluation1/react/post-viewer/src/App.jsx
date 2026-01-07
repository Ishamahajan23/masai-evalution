import { useState } from 'react'

import './App.css'
import { useEffect } from 'react';

function App() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  const [postLoading, setPostLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  const [sortAsc, setSortAsc] = useState(true);
  const [error, setError] = useState(null);
  console.log(user, posts)

  useEffect(()=>{
    async function fetchUsers(){
     try{
      setUserLoading(true);
      const res= await fetch("https://jsonplaceholder.typicode.com/users");
      const data= await res.json();
      setUser(data);
     }catch(err){
      setError(err.message)
     }finally{
      setUserLoading(false);
     }
    }
    fetchUsers();


  },[])

    useEffect(()=>{
      if(!userId ) return;
     setPostLoading(true);
     fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
     .then(res=> res.json()
    .then(data=>{ setPosts(data)}))
    .catch(err=> setError(err.message))
    .finally(()=> setPostLoading(false))


  },[userId])

  const sortedPosts = [...posts].sort((a,b)=>{
    sortAsc? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
  })




  return (
    <>
      <h1>Post Viewer</h1>

      { error && <div style={{ color: 'red' }}>Error: {error}</div> }
      <div>
        {
          userLoading ?
          <p>Loading users...</p> :
           <div>
            <select name="users" value={userId} id="users" onChange={e=> setUserId(e.target.value)}>
              <option value="">Select a User...</option>
              {user.map(u=>(
                 <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
           </div>
        }

        {!userId && <p>Please select a user to view posts.</p>}
        {
          postLoading ?
          <p>Loading posts...</p> :
          <>
          <div>
            <button onClick={()=> setSortAsc(!sortAsc)}>Sort { sortAsc ? 'Ascending' : 'Descending'}</button>
          </div>
          {
            sortedPosts.map(post=>(
              <div key={post.id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </div>
            ))
          }
          </>
        }
      </div>




   
    </>
  )
}

export default App
