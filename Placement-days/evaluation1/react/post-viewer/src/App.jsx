import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');
  const [postLoading, setPostLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);
  const [sortAsc, setSortAsc] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    async function fetchUsers() {
      try {
        setUserLoading(true);
        setError(null);
        const res = await fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setUserLoading(false);
      }
    }
    fetchUsers();
    return () => controller.abort();
  }, []);

  // Fetch posts when userId changes
  useEffect(() => {
    if (!userId) {
      setPosts([]);
      return;
    }
    const controller = new AbortController();
    async function fetchPosts() {
      try {
        setPostLoading(true);
        setError(null);
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, { signal: controller.signal });
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data = await res.json();
        setPosts(data);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        setPostLoading(false);
      }
    }
    fetchPosts();
    return () => controller.abort();
  }, [userId]);

  const sortedPosts = [...posts].sort((a, b) =>
    sortAsc
      ? a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
      : b.title.localeCompare(a.title, undefined, { sensitivity: 'base' })
  );

  return (
    <>
      <h1>Post Viewer</h1>
      {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      <div>
        {userLoading ? (
          <p>Loading users...</p>
        ) : (
          <div>
            <select
              name="users"
              value={userId}
              id="users"
              onChange={e => setUserId(e.target.value)}
            >
              <option value="">Select a User...</option>
              {users.map(u => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {!userId && <p>Please select a user to view posts.</p>}

        {postLoading ? (
          <p>Loading posts...</p>
        ) : (
          userId && (
            <>
              <div style={{ margin: '10px 0' }}>
                <strong>Total Posts: {posts.length}</strong>
              </div>
              {posts.length > 0 && (
                <div>
                  <button onClick={() => setSortAsc(s => !s)}>
                    Sort: {sortAsc ? 'A - Z' : 'Z - A'}
                  </button>
                </div>
              )}
              {sortedPosts.map(post => (
                <div
                  key={post.id}
                  style={{
                    border: '1px solid gray',
                    margin: '10px',
                    padding: '10px',
                  }}
                >
                  <h3>{post.title}</h3>
                  <p>{post.body}</p>
                </div>
              ))}
              {posts.length === 0 && <p>No posts found for this user.</p>}
            </>
          )
        )}
      </div>
    </>
  );
}

export default App;