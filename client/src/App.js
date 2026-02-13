import { useState, useEffect } from "react";

const API = "http://localhost:5000/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const load = async () => {
    const res = await fetch(API);
    setTasks(await res.json());
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title })
    });
    setTitle("");
    load();
  };

  const del = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    load();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Task Manager</h2>
      <input value={title} onChange={e => setTitle(e.target.value)} />
      <button onClick={add}>Add</button>
      {tasks.map(t => (
        <div key={t._id}>
          {t.title} <button onClick={() => del(t._id)}>X</button>
        </div>
      ))}
    </div>
  );
}

export default App;
