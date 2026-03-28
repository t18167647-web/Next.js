"use client";
import { useEffect, useState } from "react";

const playersList = ["熊", "坂田", "末永", "五島", "松尾"];

export default function TablePage() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const selectedPlayer = playersList[index];

  useEffect(() => {
    const saved = localStorage.getItem("pitchData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const filtered = data
    .map((d, i) => ({ ...d, originalIndex: i })) // ←元の位置も保存
    .filter((d) => d.player === selectedPlayer)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const hasTodayData = filtered.some((d) => d.date === today);

  const getWeeklyTotal = () => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return filtered
      .filter((d) => new Date(d.date) >= weekAgo)
      .reduce((sum, d) => sum + d.pitches, 0);
  };

  const nextPlayer = () => {
    setIndex((prev) => (prev + 1) % playersList.length);
  };

  const prevPlayer = () => {
    setIndex((prev) =>
      prev === 0 ? playersList.length - 1 : prev - 1
    );
  };

  const isDanger = (d) => d.shoulder === "×" || d.elbow === "×";

  // 🔥 削除機能
  const deleteData = (originalIndex) => {
    const newData = [...data];
    newData.splice(originalIndex, 1);

    setData(newData);
    localStorage.setItem("pitchData", JSON.stringify(newData));
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>結果</h1>

      {/* 選手切り替え */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 15,
        }}
      >
        <button onClick={prevPlayer}>←</button>
        <div style={{ fontSize: 20, fontWeight: "bold" }}>
          {selectedPlayer}
        </div>
        <button onClick={nextPlayer}>→</button>
      </div>

      {/* 今日未入力 */}
      {!hasTodayData && (
        <div
          style={{
            background: "#fff3cd",
            padding: 10,
            borderRadius: 10,
            textAlign: "center",
            marginBottom: 15,
          }}
        >
          ⚠ 今日のデータ未入力
        </div>
      )}

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
              position: "relative",
            }}
          >
            {/* 削除ボタン */}
            <button
              onClick={() => deleteData(d.originalIndex)}
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "#ff4d4d",
                color: "white",
                border: "none",
                borderRadius: 5,
                padding: "5px 8px",
              }}
            >
              削除
            </button>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>{d.date}</div>
              <div style={{ fontSize: 22, fontWeight: "bold" }}>
                {d.pitches}球
              </div>
            </div>

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
