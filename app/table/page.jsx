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

  const filtered = data
    .filter((d) => d.player === selectedPlayer)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const getWeeklyTotal = () => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return filtered
      .filter((d) => new Date(d.date) >= weekAgo)
      .reduce((sum, d) => sum + d.pitches, 0);
  };

  // 危険判定
  const isDanger = (d) => d.shoulder === "×" || d.elbow === "×";

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>結果</h1>

      {/* 選手 */}
      <select
        value={selectedPlayer}
        onChange={(e) => setSelectedPlayer(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          fontSize: 16,
          marginBottom: 15,
        }}
      >
        {playersList.map((p) => (
          <option key={p}>{p}</option>
        ))}
      </select>

      {/* 合計 */}
      <div
        style={{
          background: "#f0f0f0",
          padding: 15,
          borderRadius: 10,
          textAlign: "center",
          marginBottom: 15,
          fontWeight: "bold",
        }}
      >
        1週間：{getWeeklyTotal()} 球
      </div>

      {/* データ */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: "center" }}>データなし</div>
      ) : (
        filtered.map((d, i) => (
          <div
            key={i}
            style={{
              borderRadius: 10,
              padding: 15,
              marginBottom: 10,
              background: isDanger(d) ? "#ffe5e5" : "#f9f9f9",
            }}
          >
            {/* 上段 */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{d.date}</div>
              <div style={{ fontSize: 22, fontWeight: "bold" }}>
                {d.pitches}球
              </div>
            </div>

            {/* 下段 */}
            <div style={{ marginTop: 5 }}>
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
      <a href="/">ホーム</a>
      <br />
      <a href="/input">入力</a>
    </div>
  );
}
