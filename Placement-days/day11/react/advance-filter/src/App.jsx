import { useState } from 'react'
import './App.css'

// ### Question 2: Advanced Product Filter

// **Topic Focus:** Multiple simultaneous filters
// **Scenario:** Display products with multiple filters: category (checkboxes), price range (min/max inputs), in-stock toggle. All filters work together. Show count of filtered results. Add "Clear All Filters" button. Filters should update results in real-time.
// **Hidden Test:** Combining multiple filter conditions, efficient filtering logic

// **Mock Data:**

// ```jsx
// Array.from({ length: 40 }, (_, i) => ({
//   id: i + 1,
//   name: `Product ${i + 1}`,
//   category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
//   price: Math.floor(Math.random() * 200) + 20,
//   inStock: Math.random() > 0.3
// }))

// ```

const productsData = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
  price: Math.floor(Math.random() * 200) + 20,
  inStock: Math.random() > 0.3
}));

function App() {
     const [products, setProducts] = useState(productsData);

  return (
    <>

      <h1>Advanced Product Filter</h1>
      <div style={{
         padding:"2px",
         display: "flex",
         justifyContent: "space-around",
         alignItems: "center",
         gap: "20px"

      }}>
        {/* Category Checkboxes */}
        <div>
          <h3>Category</h3>
          <label><input type="checkbox" value="Electronics" /> Electronics</label>
          <label><input type="checkbox" value="Clothing" /> Clothing</label>
          <label><input type="checkbox" value="Books" /> Books</label>
          <label><input type="checkbox" value="Home" /> Home</label>
        </div>

        {/* Price Range Inputs */}
        <div>
          <h3>Price Range</h3>
          <label>Min: <input type="number" /></label>
          <label>Max: <input type="number" /></label>
        </div>

        {/* In-Stock Toggle */}
        <div>
          <h3>In Stock Only</h3>
          <label><input type="checkbox" /> Show In-Stock Products</label>
        </div>

        {/* Clear Filters Button */}
        <button style={{
           padding:"2px",
           
        }}>Clear All Filters</button>
      </div>  
    </>

  )
}

export default App
