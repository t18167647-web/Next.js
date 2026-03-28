'use client';

import React, { useState } from "react";

export default function PitchManagerApp() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");

  const addPlayer = () => {
    if (!name) return;
    setPlayers([...players, name]);
    setName("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>ピッチ管理アプリ</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="名前を入力"
      />

      <button onClick={addPlayer}>追加</button>

      <ul>
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
}
