import { useEffect, useState } from "react";
import "./bunk.css";

function Bunk() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://should-i-bunk-backend-79vs.onrender.com/api/bunk")
      .then((res) => res.json())
      .then((res) => {
        setData({
          decision: res.decision,
          confidence: res.confidence,
          reason: res.reason,
          insights: res.insights || [],
        });
      })
      .catch(() => setError("Failed to load bunk decision"));
  }, []);

  if (error) return <div className="bunk-page">{error}</div>;
  if (!data) return <div className="bunk-page">Analyzing...</div>;

  const decisionText = {
    BUNK: "You can bunk today 😎",
    DONT_BUNK: "Better attend today 📚",
    UP_TO_YOU: "Up to you 🤔",
  };

  const confidenceClass = {
    LOW: "conf-low",
    MEDIUM: "conf-medium",
    HIGH: "conf-high",
  };

  return (
    <div className="bunk-page">
      <h1 className="page-title">🤔 Should I Bunk?</h1>

      <div className="decision-card">
        <span className={`confidence ${confidenceClass[data.confidence]}`}>
          Confidence: {data.confidence}
        </span>

        <h2 className="decision-text">
          {decisionText[data.decision]}
        </h2>

        <p className="decision-desc">{data.reason}</p>
      </div>

      <div className="insights">
        {data.insights.map((i, idx) => (
          <div key={idx} className="insight-card">
            {i}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Bunk;


