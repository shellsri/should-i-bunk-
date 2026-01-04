import { useEffect, useState } from "react";

function Subjects() {
  const [subjects, setSubjects] = useState([]);
  const [name, setName] = useState("");
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [minAttendance, setMinAttendance] = useState(75);
  const [editingId, setEditingId] = useState(null);

  const fetchSubjects = async () => {
    const res = await fetch("http://localhost:5000/api/subjects");
    const data = await res.json();
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const saveSubject = async () => {
    if (!name || !attended || !total) return;

    const payload = {
      name,
      attended: Number(attended),
      total: Number(total),
      minAttendance: Number(minAttendance),
    };

    if (editingId) {
      await fetch(`http://localhost:5000/api/subjects/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("http://localhost:5000/api/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    resetForm();
    fetchSubjects();
  };

  const deleteSubject = async (id) => {
    await fetch(`http://localhost:5000/api/subjects/${id}`, {
      method: "DELETE",
    });
    fetchSubjects();
  };

  const editSubject = (s) => {
    setEditingId(s._id);
    setName(s.name);
    setAttended(s.attended);
    setTotal(s.total);
    setMinAttendance(s.minAttendance);
  };

  const resetForm = () => {
    setName("");
    setAttended("");
    setTotal("");
    setMinAttendance(75);
    setEditingId(null);
  };

  return (
    <>
      <h1 className="app-title">📚 Subjects</h1>

      <div className="card">
        <input className="input" placeholder="Subject name" value={name}
          onChange={(e) => setName(e.target.value)} />
        <input className="input" type="number" placeholder="Attended"
          value={attended} onChange={(e) => setAttended(e.target.value)} />
        <input className="input" type="number" placeholder="Total"
          value={total} onChange={(e) => setTotal(e.target.value)} />
        <input className="input" type="number" placeholder="Min %"
          value={minAttendance}
          onChange={(e) => setMinAttendance(e.target.value)} />

        <button className="btn" onClick={saveSubject}>
          {editingId ? "Update" : "Add"} Subject
        </button>
      </div>

      <div className="list">
        {subjects.map((s) => (
          <div key={s._id} className="deadline-item">
            <div>
              <strong>{s.name}</strong>
              <div className="small-text">
                {((s.attended / s.total) * 100).toFixed(1)}%
              </div>
            </div>

            <div className="actions">
              <button className="edit-btn" onClick={() => editSubject(s)}>Edit</button>
              <button className="delete-btn" onClick={() => deleteSubject(s._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Subjects;
