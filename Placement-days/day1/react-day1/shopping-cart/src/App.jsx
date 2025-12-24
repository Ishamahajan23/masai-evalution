import { useState } from 'react'
// import './App.css'

function App() {
  const [qty, setQty] = useState(0)
  const unitPrice = 29.99;
  let discount = qty >= 5;
  let subtotal = qty * unitPrice;
  let total = discount ? subtotal * 0.9 : subtotal;

  return (
    <>
      <div style={{padding:"0px 40px"}}>

        <h1>Shopping Card</h1>
        <p>Unit Price : ${unitPrice}</p>
        <div style={{display:"flex", gap:"10px", alignItems:"center"}}>
          <button onClick={() => setQty(qty + 1)}>+</button>
          <span>{qty}</span>
          <button onClick={() => setQty(qty - 1)}>-</button>
        </div>
        <div style={{marginTop:"20px"}}>
        {
          discount && <div style={{color:"green"}}>You got 10% discount!</div>
        }

  
        </div>


        <div>Total: ${total}</div>
      </div>
    </>
  )
}

export default App
