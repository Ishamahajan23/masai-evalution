import { useState } from "react";

function App() {
  const [password, setPassword] = useState("");

  const checks = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[^A-Za-z0-9]/.test(password)
  };

  const passedCount = Object.values(checks).filter(Boolean).length;

  const getBorderColor = () => {
    if (passedCount <= 1) return "red";
    if (passedCount <= 3) return "yellow";
    return "green";
  };

  
  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "10px",
          border: `2px solid ${getBorderColor()}`,
          borderRadius: "6px",
          outline: "none"
        }}
      />

      <ul style={{ marginTop: 12 }}>
        <li>{checks.length ? "✓" : "✗"} Min 8 characters</li>
        <li>{checks.uppercase ? "✓" : "✗"} Uppercase letter</li>
        <li>{checks.number ? "✓" : "✗"} Number</li>
        <li>{checks.special ? "✓" : "✗"} Special character</li>
      </ul>
    </div>
  );
}

export default App;
