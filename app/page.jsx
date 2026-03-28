"use client";
import { useState } from "react";

export default function Page() {
  const [name, setName] = useState("");
  const [players, setPlayers] = useState([]);

  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

  const addPlayer = () => {
    if (!name) return;

    setPlayers([
      ...players,
      {
        id: Date.now(),
        name,
        records: {},
      },
    ]);

    setName("");
  };

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

  const getRecord = (player) => {
    return (
      player.records[selectedDate] || {
        pitches: 0,
        shoulder: "○",
        elbow: "○",
      }
    );
  };

  const getWeeklyTotal = (player) => {
    const today = new Date(selectedDate);
    let total = 0;

    Object.entries(player.records).forEach(([date, record]) => {
      const d = new Date(date);
      const diff = (today - d) / (1000 * 60 * 60 * 24);

      if (diff >= 0 && diff < 7) {
        total += record.pitches;
      }
    });

    return total;
  };

  const deletePlayer = (id) => {
    setPlayers(players.filter((p) => p.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>投手管理アプリ</h1>

      {/* 日付 */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      <div style={{ marginTop: "10px" }}>
        <input
          placeholder="投手名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={addPlayer}>追加</button>
      </div>

      {players.map((p) => {
        const record = getRecord(p);

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

            {/* 球数（数字入力） */}
            <div>
              球数:
              <input
                type="number"
                value={record.pitches}
                onChange={(e) =>
                  updateRecord(p.id, "pitches", Number(e.target.value))
                }
                style={{ width: "80px", marginLeft: "10px" }}
              />
            </div>

            {/* 週間合計 */}
            <div style={{ marginTop: "5px" }}>
              直近7日合計: {getWeeklyTotal(p)} 球
            </div>

            {/* 肩 */}
            <div style={{ marginTop: "5px" }}>
              肩:
              {["○", "△", "×"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateRecord(p.id, "shoulder", s)}
                  style={{
                    marginLeft: "5px",
                    background: record.shoulder === s ? "#ddd" : "",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            {/* 肘 */}
            <div style={{ marginTop: "5px" }}>
              肘:
              {["○", "△", "×"].map((s) => (
                <button
                  key={s}
                  onClick={() => updateRecord(p.id, "elbow", s)}
                  style={{
                    marginLeft: "5px",
                    background: record.elbow === s ? "#ddd" : "",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <button
              onClick={() => deletePlayer(p.id)}
              style={{ marginTop: "10px" }}
            >
              削除
            </button>
          </div>
        );
      })}
    </div>
  );
}
