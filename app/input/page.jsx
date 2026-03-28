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
        <h1 style={{ textAlign:"center" }}>✏️ 入力</h1>

        <div style={card}>

          {/* 選手 */}
          <select value={player} onChange={(e)=>setPlayer(e.target.value)} style={input}>
            {playersList.map(p=><option key={p}>{p}</option>)}
          </select>

          {/* 日付 */}
          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={input}/>

          {/* 球数 */}
          <input type="number" placeholder="球数"
            value={pitches}
            onChange={(e)=>setPitches(e.target.value)}
            style={{...input, fontSize:20}}/>

          {/* 肩 */}
          <div style={{ marginTop:10 }}>
            <div style={label}>肩の状態</div>
            <div style={row}>
              {["○","△","×"].map(s=>(
                <button key={s} onClick={()=>setShoulder(s)} style={stateBtn(shoulder,s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 肘 */}
          <div style={{ marginTop:10 }}>
            <div style={label}>肘の状態</div>
            <div style={row}>
              {["○","△","×"].map(s=>(
                <button key={s} onClick={()=>setElbow(s)} style={stateBtn(elbow,s)}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* 保存 */}
          <button onClick={saveData} style={saveBtn}>
            保存
          </button>
        </div>

        {/* ナビ */}
        <div style={{display:"flex",gap:10,marginTop:20}}>
          <a href="/"><button style={navBtn("#222")}>🏠 ホーム</button></a>
          <a href="/input"><button style={navBtn("#3b82f6")}>✏️ 入力</button></a>
          <a href="/table"><button style={navBtn("#22c55e")}>📊 結果</button></a>
        </div>
      </div>
    </div>
  );
}

/* ---------- デザイン ---------- */

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

const label = {
  fontWeight:"bold",
  marginBottom:5
};

const row = {
  display:"flex",
  gap:10
};

/* 🔥 状態ボタン（青・黄・赤） */
const stateBtn = (current, val)=>({
  flex:1,
  padding:15,
  fontSize:18,
  borderRadius:12,
  fontWeight:"bold",
  color: val==="△" ? "#333" : "white",
  background:
    current===val
      ? val==="○"
        ? "#3b82f6"   // 青
        : val==="△"
        ? "#facc15"   // 黄色
        : "#ef4444"   // 赤
      : "#ddd"
});

const saveBtn = {
  width:"100%",
  padding:15,
  marginTop:15,
  borderRadius:15,
  background:"#3b82f6",
  color:"white",
  fontSize:16
};

const navBtn = (bg)=>({
  flex:1,
  padding:12,
  borderRadius:12,
  background:bg,
  color:"white",
  fontWeight:"bold"
});
