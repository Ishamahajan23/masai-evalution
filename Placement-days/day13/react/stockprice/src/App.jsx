import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

// ### Stock Price Ticker

// **Topic Focus:** Simulated real-time updates
// **Scenario:** Display 5 stock prices that update every 2 seconds with random changes (+/- $0.50). Show price in green if increased from last update, red if decreased. Show percentage change. Include Start/Stop updates button.
// **Hidden Test:** Interval cleanup on unmount, updating multiple items efficiently

// **Mock Initial Data:**

// ```jsx
// [
//   { symbol: 'AAPL', price: 178.50, name: 'Apple Inc.' },
//   { symbol: 'GOOGL', price: 142.30, name: 'Alphabet Inc.' },
//   { symbol: 'MSFT', price: 378.90, name: 'Microsoft Corp.' },
//   { symbol: 'AMZN', price: 145.20, name: 'Amazon.com Inc.' },
//   { symbol: 'TSLA', price: 242.80, name: 'Tesla Inc.' }
// ]

// ```

const stocksData = [
  { symbol: 'AAPL', price: 178.50, name: 'Apple Inc.' },
  { symbol: 'GOOGL', price: 142.30, name: 'Alphabet Inc.' },
  { symbol: 'MSFT', price: 378.90, name: 'Microsoft Corp.' },
  { symbol: 'AMZN', price: 145.20, name: 'Amazon.com Inc.' },
  { symbol: 'TSLA', price: 242.80, name: 'Tesla Inc.' }
];  

function App() {
  const [stocks, setStocks] = useState(stocksData);
  const [isUpdating, setIsUpdating] = useState(true);
  const [prevPrices, setPrevPrices] = useState({});

  useEffect(() => {
    if (!isUpdating) return;

    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          setPrevPrices((prev) => ({ ...prev, [stock.symbol]: stock.price }));
          const change = (Math.random() - 0.5) * 1; 
          const newPrice = parseFloat((stock.price + change).toFixed(2));
          return { ...stock, price: newPrice };
        })
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [isUpdating]);

  const toggleUpdates = () => {
    setIsUpdating((prev) => !prev);
  };  

   
   
   
  

  return (
    <>
      <div>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <h1>Stock Price Ticker</h1>
        <button onClick={toggleUpdates}>{isUpdating ? 'Stop' : 'Start'}</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Name</th>
              <th>Change (%)</th>
            </tr>
          </thead>
          <tbody>
            {stocks.map((stock) => (
              <tr key={stock.symbol}>
                <td>{stock.symbol}</td>
                <td>{stock.name}</td>
                <td style={{ color: prevPrices[stock.symbol] > stock.price ? 'red' : 'green' }}>
                  {(((stock.price - (prevPrices[stock.symbol] || stock.price)) / (prevPrices[stock.symbol] || stock.price)) * 100).toFixed(2)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </>
  )
}

export default App
