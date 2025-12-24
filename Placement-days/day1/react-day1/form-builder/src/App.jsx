import React,{ useState } from 'react'

import './App.css'

function App() {
  
  const [questions, setQuestions] = useState([]);

  const addQuestion = () => {
    setQuestions(prev => [
      ...prev,
      { id: Date.now(), text: "", type: "text" }
    ]);
  };

  const updateQuestion = (id, field, value) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === id ? { ...q, [field]: value } : q
      )
    );
  };

  const removeQuestion = (id) => {
    setQuestions(prev => prev.filter(q => q.id !== id));
  };

  return (
    <div style={{display:"flex", flexDirection:"column", gap:"10px"}}>
      <button onClick={addQuestion}>Add Question</button>

      {questions.map(q => (
        <div key={q.id} style={{display:"flex", gap:"10px"}}>
          <input
            placeholder="Question text"
            value={q.text}
            onChange={e =>
              updateQuestion(q.id, "text", e.target.value)
            }
            style={{
               padding: "1px 2px"
            }}
          />

          <select
            value={q.type}
            onChange={e =>
              updateQuestion(q.id, "type", e.target.value)
            }
          >
            <option value="text">Text</option>
            <option value="number">Number</option>
            <option value="email">Email</option>
          </select>

        </div>
      ))}

      <h3>Preview</h3>
      <ul style={{display:"flex", flexDirection:"column", gap:"10px", padding:0}}>
        {questions.map((q, index) => (
          <li key={q.id} style={{display:"flex", gap:"10px", justifyContent:"space-between", listStyleType:"none"}}>
            <span>{index + 1}.</span>
            {q.text || "Untitled"} ({q.type})
             <button onClick={() => removeQuestion(q.id)}>
            Remove
          </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App
