import { useEffect, useState } from "react";
import "./health.css";

function AcademicHealth() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("https://should-i-bunk-backend-79vs.onrender.com/api/health")
      .then(res => res.json())
      .then(setData);
  }, []);

  if (!data) return null;

  return (
    <div className="health-page">
      <h1 className="page-title">📊 Academic Health</h1>
      <p className="subtitle">
        Overall insight based on attendance & deadlines
      </p>

{/* HERO */}
<div className="hero-card">
  <div
  className="ring"
  style={{ "--percent": data.overall }}
>
  <span className="ring-value">{data.overall}%</span>
</div>


  <h2>{data.status}</h2>
  <p>
    Combined score from attendance and deadline discipline
  </p>
</div>

{/* STATS */}
<div className="stats-grid">
  <div className="stat-card">
    <h4>Attendance Health</h4>

    <div className="bar">
      <div
        className="fill"
        style={{ width: `${data.attendanceScore}%` }}
      />
    </div>

    <p className="stat-value">
      {data.attendanceScore}%
    </p>
  </div>

  <div className="stat-card">
    <h4>Deadline Health</h4>

    <div className="bar">
      <div
        className="fill green"
        style={{ width: `${data.deadlineScore}%` }}
      />
    </div>

    <p className="stat-value green">
      {data.deadlineScore}%
    </p>
  </div>

  <div className="stat-card">
    <h4>Total Subjects</h4>
    <p className="stat-value">
      {data.totalSubjects}
    </p>
  </div>
</div>



      {/* SUBJECT BREAKDOWN */}
      <div className="breakdown">
        <h3>Subject Breakdown</h3>

        {data.subjects.map(s => {
          const percent = ((s.attended / s.total) * 100).toFixed(1);
          return (
            <div key={s._id} className="subject-row">
              <div>
                <strong>{s.name}</strong>
                <span>
                  {s.attended}/{s.total} classes attended
                </span>
              </div>

              <span
                className={
                  percent >= s.minAttendance
                    ? "good"
                    : "bad"
                }
              >
                {percent}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default AcademicHealth;
