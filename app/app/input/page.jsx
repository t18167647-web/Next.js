"use client";
import { useState } from "react";

const players = ["熊", "坂田", "末永", "五島", "松尾"];

export default function InputPage() {
  const [name, setName] = useState(players[0]);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [count, setCount] = useState("");
  const [shoulder, setShoulder] = useState("○");
  const [elbow, setElbow] = useState("○");

  const saveData = () => {
    if (!count) return alert("球数入れて");

    const newData = {
      name,
      date,
      count: Number(count),
      shoulder,
      elbow,
    };

    const saved = JSON.parse(localStorage.getItem("players") || "[]");
    saved.push(newData);
    localStorage.setItem("players", JSON.stringify(saved));

    alert("保存した！");
    setCount("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>入力ページ</h1>

      <div>
        <label>選手：</label>
        <select value={name} onChange={(e) => setName(e.target.value)}>
          {players.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label>日付：</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        <label>球数：</label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
      </div>

      <div>
        <label>肩：</label>
        <select value={shoulder} onChange={(e) => setShoulder(e.target.value)}>
          <option>○</option>
          <option>×</option>
        </select>
      </div>

      <div>
        <label>肘：</label>
        <select value={elbow} onChange={(e) => setElbow(e.target.value)}>
          <option>○</option>
          <option>×</option>
        </select>
      </div>

      <button onClick={saveData} style={{ marginTop: "10px" }}>
        保存
      </button>
    </div>
  );
}
