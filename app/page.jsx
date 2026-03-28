"use client";
import { useState } from "react";

export default function Page() {
  const playerNames = ["熊", "坂田", "末永", "五島", "松尾"];

  const [players, setPlayers] = useState(
    playerNames.map((name, i) => ({
      id: i,
      name,
      records: {},
    }))
  );

  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split("T")[0];
  });

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>投手管理アプリ</h1>

      {/* 日付 */}
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      />

      {/* 一覧表 */}
      <h2 style={{ marginTop: "20px" }}>一覧</h2>
      <table border="1" cellPadding="5">
        <thead>
          <tr>
            <th>名前</th>
            <th>球数</th>
            <th>肩</th>
            <th>肘</th>
            <th>7日合計</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => {
            const record = getRecord(p);
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{record.pitches}</td>
                <td>{record.shoulder}</td>
                <td>{record.elbow}</td>
                <td>{getWeeklyTotal(p)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* 個別入力 */}
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
          </div>
        );
      })}
    </div>
  );
}
