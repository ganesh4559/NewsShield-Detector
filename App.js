import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    if (!text.trim()) {
      alert("Please enter news text");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/analyze", {
        text: text,
      });
      setResult(res.data);
    } catch (err) {
      alert("Server error");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>🛡 NewsShield Detector</h1>
      <p>Check whether a news statement is fake or real</p>

      <textarea
        placeholder="Paste news text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={analyze} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {result && (
        <div
          className={
            result.label === "NEGATIVE" ? "result fake" : "result real"
          }
        >
          <h3>Result</h3>
          <p>
            <strong>Label:</strong> {result.label}
          </p>
          <p>
            <strong>Confidence:</strong> {result.score.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
