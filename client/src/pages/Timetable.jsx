import { useEffect, useState } from "react";
import "./timetable.css";

const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Timetable() {
  const [timetable, setTimetable] = useState([]);
  const [day, setDay] = useState("Monday");
  const [time, setTime] = useState("");
  const [subject, setSubject] = useState("");
  const [editingSlot, setEditingSlot] = useState(null);

  const fetchTimetable = async () => {
    const res = await fetch("https://should-i-bunk-backend-79vs.onrender.com/api/timetable");
    const data = await res.json();
    setTimetable(data);
  };

  useEffect(() => {
    fetchTimetable();
  }, []);

  const addSlot = async () => {
    if (!time || !subject) return;

    await fetch("https://should-i-bunk-backend-79vs.onrender.com/api/timetable", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ day, time, subject }),
    });

    resetForm();
    fetchTimetable();
  };

  const deleteSlot = async (slotId) => {
    await fetch(`https://should-i-bunk-backend-79vs.onrender.com/api/timetable/slot/${slotId}`, {
      method: "DELETE",
    });
    fetchTimetable();
  };

  const startEdit = (slot) => {
    setEditingSlot(slot._id);
    setTime(slot.time);
    setSubject(slot.subject);
  };

  const updateSlot = async () => {
    await fetch(
      `https://should-i-bunk-backend-79vs.onrender.com/api/timetable/slot/${editingSlot}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ time, subject }),
      }
    );

    resetForm();
    fetchTimetable();
  };

  const resetForm = () => {
    setEditingSlot(null);
    setTime("");
    setSubject("");
  };

  return (
    <div className="timetable-page">
      {/* LEFT */}
      <div className="week-view">
        <h1 className="page-title">📅 Weekly Timetable</h1>

        {DAYS.map((d) => {
          const dayData = timetable.find((t) => t.day === d);

          return (
            <div key={d} className="day-card">
              <h3>{d}</h3>

              {dayData?.slots?.length ? (
                dayData.slots.map((s) => (
                  <div key={s._id} className="slot">
                    <div>
                      <strong>{s.time}</strong>
                      <div className="small-text">{s.subject}</div>
                    </div>

                    <div className="actions">
                      <button
                        className="action-btn edit"
                        onClick={() => startEdit(s)}
                      >
                        Edit
                      </button>

                      <button
                        className="action-btn delete"
                        onClick={() => deleteSlot(s._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty">No classes</p>
              )}
            </div>
          );
        })}
      </div>

      {/* RIGHT */}
      <div className="add-panel">
        <h2>{editingSlot ? "Edit Slot" : "Add Class Slot"}</h2>

        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {DAYS.map((d) => (
            <option key={d}>{d}</option>
          ))}
        </select>

        <input
          placeholder="Time (e.g. 09:00 - 10:00)"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        <input
          placeholder="Subject (e.g. DBMS)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        <button onClick={editingSlot ? updateSlot : addSlot}>
          {editingSlot ? "Update Slot" : "Add Slot"}
        </button>
      </div>
    </div>
  );
}

export default Timetable;
