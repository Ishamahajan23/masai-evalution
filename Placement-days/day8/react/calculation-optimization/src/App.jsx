import { useState, useEffect, useMemo } from 'react'

import './App.css'

function isPrime(n) {
  if (n <= 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) return false;
  }
  return true;
}

function getFactors(n) {
  const factors = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
  }
  return factors;
}

function App() {
  const [number, setNumber] = useState(0);
  const [theme, setTheme] = useState('light');
  const [calcCount, setCalcCount] = useState(0);

  const num = Number(number);

  const { prime, factors, sum } = useMemo(() => {
    const prime = isPrime(num);
    const factors = getFactors(num);
    const sum = factors.reduce((a, b) => a + b, 0);
    return { prime, factors, sum };
  }, [num]);

  useEffect(() => {
    setCalcCount((c) => c + 1);
  }, [num]);

  const handleChange = (e) => {
    setNumber(e.target.value);
  };

  const toggleTheme = () => {
    setTheme((t) => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={theme === 'dark' ? 'dark' : ''} style={{ minHeight: '100vh', background: theme === 'dark' ? '#222' : '#fff', color: theme === 'dark' ? '#fff' : '#222' }}>
      <button onClick={toggleTheme} style={{ margin: '1rem', padding: '0.5rem 1rem' }}>
        Toggle Theme ({theme})
      </button>
      <div style={{ margin: '1rem' }}>
        <input type="number" value={number} onChange={handleChange} style={{ padding: '0.5rem', fontSize: '1rem' }} />
      </div>
      <div style={{ margin: '1rem' }}>
        <div>Calculation count: {calcCount}</div>
        <div>Is Prime? {num ? (prime ? 'Yes' : 'No') : '-'}</div>
        <div>Factors: {num ? factors.join(', ') : '-'}</div>
        <div>Sum of Factors: {num ? sum : '-'}</div>
      </div>
    </div>
  );
}

export default App