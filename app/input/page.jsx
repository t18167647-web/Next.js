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
    <div style={bg}>
      <div style={container}>
        <h1 style={{ textAlign: "center" }}>✏️ 入力</h1>

        <div style={card}>
          <select value={player} onChange={(e)=>setPlayer(e.target.value)} style={input} >
            {playersList.map(p=><option key={p}>{p}</option>)}
          </select>

          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={input} />

          <input type="number" placeholder="球数" value={pitches}
            onChange={(e)=>setPitches(e.target.value)} style={{...input, fontSize:20}} />

          <div>肩：
            {["○","△","×"].map(s=>(
              <button key={s} onClick={()=>setShoulder(s)}
                style={stateBtn(shoulder,s)}>{s}</button>
            ))}
          </div>

          <div>肘：
            {["○","△","×"].map(s=>(
              <button key={s} onClick={()=>setElbow(s)}
                style={stateBtn(elbow,s)}>{s}</button>
            ))}
          </div>

          <button onClick={saveData} style={saveBtn}>保存</button>
        </div>

        {nav}
      </div>
    </div>
  );
}

const bg = {
  minHeight:"100vh",
  background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",
  padding:20
};

const container = {
  maxWidth:500,
  margin:"0 auto"
};

const card = {
  background:"white",
  padding:15,
  borderRadius:15,
  boxShadow:"0 4px 10px rgba(0,0,0,0.05)"
};

const input = {
  width:"100%",
  padding:12,
  marginBottom:10,
  borderRadius:10
};

const stateBtn = (current, val)=>({
  margin:5,
  padding:10,
  borderRadius:10,
  background: current===val ? (val==="×"?"#fecaca":"#bbf7d0"):"#eee"
});

const saveBtn = {
  width:"100%",
  padding:15,
  marginTop:10,
  borderRadius:15,
  background:"#3b82f6",
  color:"white"
};

const nav = (
  <div style={{display:"flex",gap:10,marginTop:20}}>
    <a href="/"><button style={navBtn("#222")}>🏠</button></a>
    <a href="/input"><button style={navBtn("#3b82f6")}>✏️</button></a>
    <a href="/table"><button style={navBtn("#22c55e")}>📊</button></a>
  </div>
);

const navBtn = (bg)=>({
  flex:1,
  padding:12,
  borderRadius:12,
  background:bg,
  color:"white"
});
