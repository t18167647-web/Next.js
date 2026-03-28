"use client";
import { useEffect, useState } from "react";

const playersList = ["熊", "坂田", "末永", "五島", "松尾"];

export default function TablePage() {
  const [data, setData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(playersList[0]);

  useEffect(() => {
    const saved = localStorage.getItem("pitchData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  // 日付順に並び替え（新しい順）
  const sortedData = data
    .filter((d) => d.player === selectedPlayer)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // 1週間の合計
  const getWeeklyTotal = () => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return sortedData
      .filter((d) => new Date(d.date) >= weekAgo)
      .reduce((sum, d) => sum + d.pitches, 0);
  };

  return (
    <div style={{ padding: 20, maxWidth: 600, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>一覧</h1>

      {/* 選手選択 */}
      <div style={{ marginBottom: 20 }}>
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
          style={{ width: "100%", padding: 10, fontSize: 16 }}
        >
          {playersList.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* 合計表示 */}
      <div
        style={{
          background: "#f0f0f0",
          padding: 15,
          borderRadius: 10,
          marginBottom: 20,
          textAlign: "center",
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        1週間の球数：{getWeeklyTotal()} 球
      </div>

      {/* データ一覧 */}
      {sortedData.length === 0 ? (
        <div style={{ textAlign: "center" }}>データなし</div>
      ) : (
        sortedData.map((d, i) => (
          <div
            key={i}
            style={{
              border: "1px solid #ddd",
              borderRadius: 10,
              padding: 15,
              marginBottom: 10,
            }}
          >
            <div style={{ fontSize: 14, color: "#666" }}>{d.date}</div>

            <div style={{ fontSize: 22, fontWeight: "bold" }}>
              {d.pitches} 球
            </div>

            <div>
              肩：
              <span style={{ color: d.shoulder === "×" ? "red" : "green" }}>
                {d.shoulder}
              </span>
              ／ 肘：
              <span style={{ color: d.elbow === "×" ? "red" : "green" }}>
                {d.elbow}
              </span>
            </div>
          </div>
        ))
      )}

      <br />
      <a href="/">ホームへ</a>
      <br />
      <a href="/input">入力ページへ</a>
    </div>
  );
}
