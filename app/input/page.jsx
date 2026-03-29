"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import Link from "next/link";

export default function InputPage() {
  const defaultPlayers = ["熊","坂田","末永","五島","松尾"];

  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");

  const [player, setPlayer] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [pitches, setPitches] = useState("");
  const [shoulder, setShoulder] = useState("○");
  const [elbow, setElbow] = useState("○");
  const [comment, setComment] = useState("");
  const [type, setType] = useState("ブルペン");

  useEffect(() => {
    setPlayers(defaultPlayers);
    setPlayer(defaultPlayers[0]);
  }, []);

  const addPlayer = () => {
    if (!newPlayer) return;
    setPlayers([...players, newPlayer]);
    setNewPlayer("");
  };

  const saveData = async () => {
    if (!pitches) return;

    try {
      await addDoc(collection(db, "pitchData"), {
        player,
        date,
        pitches: Number(pitches),
        shoulder,
        elbow,
        comment,
        role: "選手",
        type,
        coachComment: ""
      });

      setPitches("");
      setComment("");
      alert("保存しました");
    } catch (error) {
      console.error("保存エラー:", error);
      alert("保存失敗");
    }
  };

  return (
    <div style={bg}>
      <div style={container}>

        {/* ナビ */}
        <div style={nav}>
          <Link href="/table">
            <button style={navBtn}>結果へ</button>
          </Link>
        </div>

        <h1 style={{ textAlign: "center" }}>✏️ 入力</h1>

        <div style={card}>

          <div style={row}>
            <input
              value={newPlayer}
              onChange={(e) => setNewPlayer(e.target.value)}
              placeholder="選手追加"
              style={input}
            />
            <button onClick={addPlayer} style={addBtn}>追加</button>
          </div>

          <div style={label}>選手</div>
          <select value={player} onChange={(e) => setPlayer(e.target.value)} style={input}>
            {players.map(p => <option key={p}>{p}</option>)}
          </select>

          <div style={label}>日付</div>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={input} />

          <div style={label}>球数</div>
          <input type="number" value={pitches} onChange={(e) => setPitches(e.target.value)} style={input} />

          <div style={label}>投球種類</div>
          <select value={type} onChange={(e) => setType(e.target.value)} style={input}>
            <option>ブルペン</option>
            <option>実戦練習</option>
            <option>試合</option>
          </select>

          <div style={label}>肩の状態</div>
          <div style={row}>
            {["○","△","×"].map(s => (
              <button key={s} onClick={() => setShoulder(s)} style={stateBtn(shoulder, s)}>{s}</button>
            ))}
          </div>

          <div style={label}>肘の状態</div>
          <div style={row}>
            {["○","△","×"].map(s => (
              <button key={s} onClick={() => setElbow(s)} style={stateBtn(elbow, s)}>{s}</button>
            ))}
          </div>

          <div style={label}>コメント</div>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} style={textarea} />

          <button onClick={saveData} style={saveBtn}>保存</button>
        </div>
      </div>
    </div>
  );
}

/* style */
const bg = { minHeight: "100vh", background: "linear-gradient(135deg,#dbeafe,#f0fdf4)", padding: 20 };
const container = { maxWidth: 500, margin: "0 auto" };
const card = { background: "white", padding: 20, borderRadius: 20 };
const label = { fontWeight: "bold", marginTop: 10 };
const input = { width: "100%", height: 45, marginBottom: 10 };
const textarea = { width: "100%", minHeight: 80, marginBottom: 10 };
const row = { display: "flex", gap: 10 };
const nav = { display: "flex", justifyContent: "flex-end", marginBottom: 10 };
const navBtn = { padding: "8px 16px" };
const stateBtn = (c, v) => ({
  flex: 1,
  height: 50,
  background: c === v ? (v === "○" ? "#3b82f6" : v === "△" ? "#facc15" : "#ef4444") : "#ddd"
});
const addBtn = { width: 80 };
const saveBtn = { width: "100%", height: 50, background: "#3b82f6", color: "white" };
