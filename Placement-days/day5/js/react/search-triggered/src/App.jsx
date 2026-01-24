import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    setError(null);
    setUserData(null);
    try {
      const response = await fetch(`https://api.github.com/users/${username}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };  

  useEffect(() => {
    if (!username) {
      setUserData(null);
      setError(null);
    }
  }, [username]);

  return (
    <>
      <div className="App">
        <h1>GitHub User Search</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter GitHub username"
        />
        <button onClick={handleSearch} disabled={!username || loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>

        {error && <p style={{ color: 'red' }}>{error}</p>}

        {userData && (
          <div className="user-profile">
            <img src={userData.avatar_url} alt={userData.login} width="100" />
            <h2>{userData.name}</h2>
            <p>{userData.bio}</p>
            <p>Followers: {userData.followers}</p>
          </div>
        )}
      </div>


    </>
  )
}

export default App
