import { useEffect, useState } from "react";
import "./today.css";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Today() {
  const [slots, setSlots] = useState([]);

  const fetchTodayClasses = async () => {
    const res = await fetch("http://localhost:5000/api/timetable");
    const data = await res.json();

    const today = DAYS[new Date().getDay()];
    const todayData = data.find((d) => d.day === today);

    setSlots(todayData ? todayData.slots : []);
  };

  useEffect(() => {
    fetchTodayClasses();
  }, []);

  const markAttendance = async (subject, present) => {
    await fetch("http://localhost:5000/api/subjects/mark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ subjectName: subject, present }),
    });

    alert(`${subject} marked ${present ? "Present" : "Absent"}`);
  };

  return (
    <div>
      <h1 className="page-title">📅 Today</h1>
      <p className="subtitle">Mark attendance for today’s classes</p>

      {slots.length === 0 ? (
        <p className="empty">No classes today 🎉</p>
      ) : (
        <div className="list">
          {slots.map((slot, i) => (
            <div key={i} className="today-card">
              <div>
                <strong>{slot.time}</strong>
                <div className="small-text">{slot.subject}</div>
              </div>

              <div className="actions">
                <button
                  className="action-btn present"
                  onClick={() => markAttendance(slot.subject, true)}
                >
                  Present
                </button>

                <button
                  className="action-btn absent"
                  onClick={() => markAttendance(slot.subject, false)}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Today;
