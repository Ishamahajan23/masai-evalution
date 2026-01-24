import { useEffect, useState } from 'react'

import './App.css'
function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(!data){
    fetch('https://jsonplaceholder.typicode.com/users/1')
    .then(response => response.json())
    .then(json => setData(json))
    .catch(err => setError(err.message));
    }

  }, [data])
  console.log(error);

  return (
    <>
      
      <div className="App">
        <h1>User Profile</h1>
        {data ? (
          <div>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Username:</strong> {data.username}</p>
            <p><strong>Email:</strong> {data.email}</p>
            <p><strong>Phone:</strong> {data.phone}</p>
            <p><strong>Website:</strong> {data.website}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
        {error && (
          <div>
            <p style={{ color: 'red' }}>Error: {error}</p>
            <button onClick={() => {
              setError(null);
              setData(null);
            }}>Retry</button>
          </div>
        )}
      </div>
    </>
  )
}

export default App
