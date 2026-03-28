"use client";
import { useState, useEffect } from "react";

export default function TablePage() {
  const [players, setPlayers] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // 保存データ読み込み
  useEffect(() => {
    const saved = localStorage.getItem("players");
    if (saved) {
      setPlayers(JSON.parse(saved));
    }
  }, []);

  const getRecord = (p) =>
    p.records?.[selectedDate] || {
      pitches: 0,
      shoulder: "○",
      elbow: "○",
    };

  return (
    <div style={{ padding: "20px" }}>
      <h1>一覧ページ</h1>
      <a href="/">← ホームに戻る</a>

      <div>
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      <table border="1">
        <thead>
          <tr>
            <th>名前</th>
            <th>球数</th>
            <th>肩</th>
            <th>肘</th>
          </tr>
        </thead>
        <tbody>
          {players.map((p) => {
            const r = getRecord(p);
            return (
              <tr key={p.id}>
                <td>{p.name}</td>
                <td>{r.pitches}</td>
                <td>{r.shoulder}</td>
                <td>{r.elbow}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
