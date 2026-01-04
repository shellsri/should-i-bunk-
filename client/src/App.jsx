import { useState } from "react";

import Home from "./pages/Home";
import Timetable from "./pages/Timetable";
import Today from "./pages/Today";
import Bunk from "./pages/Bunk";
import Deadlines from "./pages/Deadlines";
import Health from "./pages/AcademicHealth";

import "./index.css";

function App() {
  const [view, setView] = useState("home");

  return (
    <div className="app">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <h2 className="logo">Should I Bunk?</h2>

        <nav className="menu">
          <button onClick={() => setView("home")}>🏠 Home</button>
          <button onClick={() => setView("timetable")}>📅 Timetable</button>
          <button onClick={() => setView("today")}>✅ Today</button>
          <button onClick={() => setView("bunk")}>🤔 Bunk</button>
          <button onClick={() => setView("deadlines")}>⏳ Deadlines</button>
          <button onClick={() => setView("health")}>📊 Health</button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="main">
        {view === "home" && <Home setView={setView} />}
        {view === "timetable" && <Timetable />}
        {view === "today" && <Today />}
        {view === "bunk" && <Bunk />}
        {view === "deadlines" && <Deadlines />}
        {view === "health" && <Health />}
      </main>
    </div>
  );
}

export default App;



