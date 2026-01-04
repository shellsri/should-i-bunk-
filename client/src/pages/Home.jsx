import "./home.css";

function Home({ setView }) {
  return (
    <div className="home">
      <h1 className="home-title">🎓 Should I Bunk?</h1>
      <p className="home-subtitle">
        Smart academic decision system based on your timetable, attendance,
        deadlines, and performance.
      </p>

      <div className="home-cards">
        <div className="home-card">
          <h3>📅 Timetable</h3>
          <p>Set your weekly class schedule</p>
          <button onClick={() => setView("timetable")}>Set Timetable</button>
        </div>

        <div className="home-card">
          <h3>✅ Today</h3>
          <p>Mark attendance for today’s classes</p>
          <button onClick={() => setView("today")}>Go to Today</button>
        </div>

        <div className="home-card">
          <h3>🤔 Should I Bunk?</h3>
          <p>Get a smart bunk decision</p>
          <button onClick={() => setView("bunk")}>Analyze</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
