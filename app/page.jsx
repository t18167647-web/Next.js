"use client";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  const addPlayer = () => {
    if (!name) return;

    const newPlayer = {
      id: Date.now(),
      name,
      pitches: 0,
      shoulder: "○",
      elbow: "○",
    };

    setPlayers([...players, newPlayer]);
    setName("");
  };

  const updatePlayer = (id, field, value) => {
    setPlayers(
      players.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      )
    );
  };

  const addPitch = (id, amount) => {
    setPlayers(
      players.map((p) =>
        p.id === id
          ? { ...p, pitches: Math.max(0, p.pitches + amount) }
          : p
      )
    );
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>投手管理アプリ</h1>

      <input
        placeholder="投手名"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={addPlayer} style={{ marginLeft: "10px" }}>
        追加
      </button>

      {players.map((p) => (
        <div
          key={p.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <h3>{p.name}</h3>

          <div>
            球数: {p.pitches}
            <button onClick={() => addPitch(p.id, 1)}>+1</button>
            <button onClick={() => addPitch(p.id, -1)}>-1</button>
          </div>

          <div>
            肩:
            <button onClick={() => updatePlayer(p.id, "shoulder", "○")}>○</button>
            <button onClick={() => updatePlayer(p.id, "shoulder", "△")}>△</button>
            <button onClick={() => updatePlayer(p.id, "shoulder", "×")}>×</button>
          </div>

          <div>
            肘:
            <button onClick={() => updatePlayer(p.id, "elbow", "○")}>○</button>
            <button onClick={() => updatePlayer(p.id, "elbow", "△")}>△</button>
            <button onClick={() => updatePlayer(p.id, "elbow", "×")}>×</button>
          </div>

          <button
            onClick={() => deletePlayer(p.id)}
            style={{ marginTop: "10px" }}
          >
            削除
          </button>
        </div>
      ))}
    </div>
  );
}
