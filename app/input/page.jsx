"use client";
import { useState } from "react";

const playersList = ["熊", "坂田", "末永", "五島", "松尾"];

export default function InputPage() {
  const [player, setPlayer] = useState(playersList[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [pitches, setPitches] = useState("");
  const [shoulder, setShoulder] = useState("○");
  const [elbow, setElbow] = useState("○");

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
    alert("保存しました");
  };

  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto" }}>
      <h1 style={{ textAlign: "center" }}>入力</h1>

      <select value={player} onChange={(e) => setPlayer(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 10 }}>
        {playersList.map((p) => <option key={p}>{p}</option>)}
      </select>

      <input type="date" value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ width: "100%", padding: 12, marginBottom: 10 }} />

      <input type="number" placeholder="球数"
        value={pitches}
        onChange={(e) => setPitches(e.target.value)}
        style={{ width: "100%", padding: 15, fontSize: 20, marginBottom: 10 }} />

      <div>
        肩：
        {["○","△","×"].map(s => (
          <button key={s} onClick={()=>setShoulder(s)}
            style={{
              margin:5,
              padding:10,
              background: shoulder===s ? (s==="×"?"#ffcccc":"#ccffcc") : "#eee"
            }}>{s}</button>
        ))}
      </div>

      <div>
        肘：
        {["○","△","×"].map(s => (
          <button key={s} onClick={()=>setElbow(s)}
            style={{
              margin:5,
              padding:10,
              background: elbow===s ? (s==="×"?"#ffcccc":"#ccffcc") : "#eee"
            }}>{s}</button>
        ))}
      </div>

      <button onClick={saveData}
        style={{ width:"100%", padding:15, marginTop:10, background:"#0070f3", color:"white", borderRadius:10 }}>
        保存
      </button>

      {/* ナビ */}
      <div style={{ display:"flex", gap:10, marginTop:20 }}>
        <a href="/"><button style={navStyle("#222")}>ホーム</button></a>
        <a href="/input"><button style={navStyle("#0070f3")}>入力</button></a>
        <a href="/table"><button style={navStyle("#00a86b")}>結果</button></a>
      </div>
    </div>
  );
}

const navStyle = (bg) => ({
  flex:1,
  padding:12,
  borderRadius:10,
  background:bg,
  color:"white",
  fontWeight:"bold"
});
