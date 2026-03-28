"use client";
import { useState, useEffect } from "react";

const playersList = ["熊", "坂田", "末永", "五島", "松尾"];

export default function InputPage() {
  const [player, setPlayer] = useState(playersList[0]);
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [pitches, setPitches] = useState("");
  const [shoulder, setShoulder] = useState("○");
  const [elbow, setElbow] = useState("○");
  const [savedMsg, setSavedMsg] = useState("");

  const saveData = () => {
    if (!pitches) return;

    const newData = {
      player,
      date,
      pitches: Number(pitches),
      shoulder,
      elbow,
    };

    const saved = JSON.parse(localStorage.getItem("pitchData") || "[]");
    saved.push(newData);
    localStorage.setItem("pitchData", JSON.stringify(saved));

    setPitches("");
    setSavedMsg("保存しました");
    setTimeout(() => setSavedMsg(""), 1500);
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>入力</h1>

      {/* 選手 */}
      <div style={{ marginBottom: 15 }}>
        <select
          value={player}
          onChange={(e) => setPlayer(e.target.value)}
          style={{ width: "100%", padding: 12, fontSize: 16 }}
        >
          {playersList.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* 日付 */}
      <div style={{ marginBottom: 15 }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          style={{ width: "100%", padding: 12, fontSize: 16 }}
        />
      </div>

      {/* 球数 */}
      <div style={{ marginBottom: 15 }}>
        <input
          type="number"
          placeholder="球数"
          value={pitches}
          onChange={(e) => setPitches(e.target.value)}
          style={{
            width: "100%",
            padding: 15,
            fontSize: 20,
            textAlign: "center",
          }}
        />
      </div>

      {/* 肩 */}
      <div style={{ marginBottom: 10 }}>
        <div>肩</div>
        {["○", "△", "×"].map((s) => (
          <button
            key={s}
            onClick={() => setShoulder(s)}
            style={{
              marginRight: 10,
              padding: "10px 15px",
              fontSize: 18,
              background:
                shoulder === s
                  ? s === "×"
                    ? "#ffcccc"
                    : "#ccffcc"
                  : "#eee",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 肘 */}
      <div style={{ marginBottom: 20 }}>
        <div>肘</div>
        {["○", "△", "×"].map((s) => (
          <button
            key={s}
            onClick={() => setElbow(s)}
            style={{
              marginRight: 10,
              padding: "10px 15px",
              fontSize: 18,
              background:
                elbow === s
                  ? s === "×"
                    ? "#ffcccc"
                    : "#ccffcc"
                  : "#eee",
            }}
          >
            {s}
          </button>
        ))}
      </div>

      {/* 保存ボタン */}
      <button
        onClick={saveData}
        style={{
          width: "100%",
          padding: 15,
          fontSize: 18,
          background: "#0070f3",
          color: "white",
          borderRadius: 10,
        }}
      >
        保存
      </button>

      {/* 保存メッセージ */}
      {savedMsg && (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          {savedMsg}
        </div>
      )}

      <br />
      <a href="/">ホームへ</a>
      <br />
      <a href="/table">一覧へ</a>
    </div>
  );
}
