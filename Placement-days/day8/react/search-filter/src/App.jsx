import { useState, useEffect } from 'react';
import './App.css';

  const mockData= Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Food', 'Books'][i % 4],
  price: (Math.random() * 100 + 10).toFixed(2)
}))


function App() {

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(mockData);
  const [searching, setSearching] = useState(false);
  const DEBOUNCE_DELAY = 300;

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchTerm.trim() === "") {
        setFilteredData(mockData);
      } else {
        setFilteredData(
          mockData.filter((product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      }
      setSearching(false);
    }, DEBOUNCE_DELAY);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleChange = (e) => {
    setSearching(true);
    setSearchTerm(e.target.value);
  };



  return (
   <div>
      <div style={{ }}>
        <input 
          type="text" 
          placeholder='Search products...'
          onChange={handleChange}
          value={searchTerm}
          style={{ padding:"2px"}}
        />
        <p>{searching && searchTerm ? "Searching..." : ""}</p>

        <ul style={{ display:"grid", gridTemplateColumns: "200px 200px 200px"}}>
          {
            filteredData.map((product) => (
              <li key={product.id} style={{listStyle:"none", border:"1px solid gray", margin:"4px", padding:"4px"}}>
                <h3>{product.name}</h3>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price}</p>
              </li>
            ))
          }
        </ul>
      </div>

   </div>
  )
}

export default App
