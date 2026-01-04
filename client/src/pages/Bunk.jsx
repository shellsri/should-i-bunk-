import "./bunk.css";

function Bunk({ decision = "UP_TO_YOU", confidence = "LOW" }) {
  const decisionText = {
    BUNK: "You can bunk today 😎",
    DONT_BUNK: "Better attend today 📚",
    UP_TO_YOU: "Up to you 🤔",
  };

  const confidenceColor = {
    LOW: "conf-low",
    MEDIUM: "conf-medium",
    HIGH: "conf-high",
  };

  return (
    <div className="bunk-page">
      <h1 className="page-title">🤔 Should I Bunk?</h1>
      <p className="subtitle">
        Smart decision based on attendance, timetable, and deadlines
      </p>

      {/* DECISION CARD */}
      <div className="decision-card">
        <span className={`confidence ${confidenceColor[confidence]}`}>
          Confidence: {confidence}
        </span>

        <h2 className="decision-text">{decisionText[decision]}</h2>

        <p className="decision-desc">
          Attendance and deadlines are currently balanced.
        </p>
      </div>

      {/* INSIGHTS */}
      <div className="insights">
        <div className="insight-card">
          📊 Attendance is above minimum requirement
        </div>
        <div className="insight-card">
          ⏳ No urgent deadlines today
        </div>
        <div className="insight-card">
          📅 Classes scheduled later today
        </div>
      </div>

      {/* TIP */}
      <div className="bunk-tip">
        💡 Tip: Keep Academic Health above <strong>75</strong> to bunk safely
        more often.
      </div>
    </div>
  );
}

export default Bunk;
