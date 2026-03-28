"use client";
import { useState, useEffect } from "react";

const playerNames = ["熊", "坂田", "末永", "五島", "松尾"];

export default function InputPage() {
  const [players, setPlayers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // 初回読み込み
  useEffect(() => {
    const saved = localStorage.getItem("players");
    if (saved) {
      setPlayers(JSON.parse(saved));
    } else {
      setPlayers(
        playerNames.map((name, i) => ({
          id: i,
          name,
          records: {},
        }))
      );
    }
  }, []);

  // 保存
  useEffect(() => {
    localStorage.setItem("players", JSON.stringify(players));
  }, [players]);

  const updateRecord = (id, field, value) => {
    setPlayers(
      players.map((p) => {
        if (p.id !== id) return p;

        const record = p.records[selectedDate] || {
          pitches: 0,
          shoulder: "○",
          elbow: "○",
        };

        return {
          ...p,
          records: {
            ...p.records,
            [selectedDate]: {
              ...record,
              [field]: value,
            },
          },
        };
      })
    );
  };

  const getRecord = (p) =>
    p.records[selectedDate] || {
      pitches: 0,
      shoulder: "○",
      elbow: "○",
    };

  return (
    <div style={{ padding: "20px" }}>
      <h1>入力ページ</h1>

      <a href="/">← ホーム</a>
      <br />
      <a href="/table">一覧へ</a>

      <div style={{ marginTop: "10px" }}>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {players.map((p) => {
        const r = getRecord(p);

        return (
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
              球数:
              <input
                type="number"
                value={r.pitches}
                onChange={(e) =>
                  updateRecord(p.id, "pitches", Number(e.target.value))
                }
                style={{ width: "80px", marginLeft: "10px" }}
              />
            </div>

            <div style={{ marginTop: "5px" }}>
              肩:
              {["○", "△", "×"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateRecord(p.id, "shoulder", s)}
                  style={{
                    marginLeft: "5px",
                    background: r.shoulder === s ? "#ddd" : "",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div style={{ marginTop: "5px" }}>
              肘:
              {["○", "△", "×"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateRecord(p.id, "elbow", s)}
                  style={{
                    marginLeft: "5px",
                    background: r.elbow === s ? "#ddd" : "",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
