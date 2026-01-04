import { useEffect, useState } from "react";
import "./deadlines.css";

function Deadlines() {
  const [deadlines, setDeadlines] = useState([]);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [date, setDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [editingId, setEditingId] = useState(null);

  /* ---------------- FETCH ---------------- */
  const fetchDeadlines = async () => {
    const res = await fetch("https://should-i-bunk-backend-79vs.onrender.com/api/deadlines");
    const data = await res.json();
    setDeadlines(data);
  };

  useEffect(() => {
    fetchDeadlines();
  }, []);

  /* ---------------- SAVE (ADD / UPDATE) ---------------- */
  const saveDeadline = async () => {
    if (!title || !date) return;

    const payload = { title, subject, date, priority };

    if (editingId) {
      await fetch(`https://should-i-bunk-backend-79vs.onrender.com/api/deadlines/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("https://should-i-bunk-backend-79vs.onrender.com/api/deadlines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchDeadlines();
  };

  /* ---------------- ACTIONS ---------------- */
  const startEdit = (d) => {
    setEditingId(d._id);
    setTitle(d.title);
    setSubject(d.subject || "");
    setDate(d.date);
    setPriority(d.priority);
  };

  const deleteDeadline = async (id) => {
    await fetch(`https://should-i-bunk-backend-79vs.onrender.com/api/deadlines/${id}`, {
      method: "DELETE",
    });
    fetchDeadlines();
  };

  const toggleComplete = async (d) => {
    await fetch(`https://should-i-bunk-backend-79vs.onrender.com/api/deadlines/${d._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...d, completed: !d.completed }),
    });
    fetchDeadlines();
  };

  const resetForm = () => {
    setTitle("");
    setSubject("");
    setDate("");
    setPriority("Medium");
    setEditingId(null);
  };

  /* ---------------- STATS ---------------- */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const overdue = deadlines.filter(
    (d) => !d.completed && new Date(d.date) < today
  ).length;

  const todayCount = deadlines.filter(
    (d) =>
      !d.completed &&
      new Date(d.date).toDateString() === today.toDateString()
  ).length;

  const next3Days = deadlines.filter((d) => {
    const diff = (new Date(d.date) - today) / (1000 * 60 * 60 * 24);
    return !d.completed && diff > 0 && diff <= 3;
  }).length;

  const next7Days = deadlines.filter((d) => {
    const diff = (new Date(d.date) - today) / (1000 * 60 * 60 * 24);
    return !d.completed && diff > 3 && diff <= 7;
  }).length;

  /* ---------------- UI ---------------- */
  return (
    <div className="deadlines-page">
      <h1 className="page-title">📌 Deadline Tracker</h1>
      <p className="subtitle">
        Track assignments, exams, and submissions smartly
      </p>

      {/* STATS */}
      <div className="stats-grid">
        <div className="stat overdue">
          <h4>Overdue</h4>
          <p>{overdue}</p>
        </div>
        <div className="stat today">
          <h4>Today</h4>
          <p>{todayCount}</p>
        </div>
        <div className="stat next3">
          <h4>Next 3 Days</h4>
          <p>{next3Days}</p>
        </div>
        <div className="stat next7">
          <h4>Next 7 Days</h4>
          <p>{next7Days}</p>
        </div>
      </div>

      {/* FORM */}
      <form
        className="deadline-form"
        onSubmit={(e) => {
          e.preventDefault();
          saveDeadline();
        }}
      >
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Subject (optional)"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

       <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="date-input"
/>


        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <button type="submit" disabled={!title || !date}>
          {editingId ? "Update Deadline" : "Add Deadline"}
        </button>
      </form>

      {/* LIST */}
      {deadlines.length === 0 ? (
        <div className="empty-state">💤 No deadlines yet. You’re chilling.</div>
      ) : (
        <div className="deadline-list">
          {deadlines.map((d) => (
            <div
              key={d._id}
              className={`deadline-item ${d.completed ? "completed" : ""}`}
            >
              <div>
                <strong>{d.title}</strong>
                <p className="muted">
                  {d.subject || "General"} • {d.date}
                </p>
              </div>

              <div className="right">
                <span className={`priority ${d.priority.toLowerCase()}`}>
                  {d.priority}
                </span>

                <button
                  type="button"
                  className="complete-btn"
                  onClick={() => toggleComplete(d)}
                >
                  {d.completed ? "Undo" : "Complete"}
                </button>

                <button
                  type="button"
                  className="edit-btn"
                  onClick={() => startEdit(d)}
                >
                  Edit
                </button>

                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => deleteDeadline(d._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Deadlines;

