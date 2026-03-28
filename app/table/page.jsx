"use client";
import { useEffect, useState } from "react";

const playersList = ["熊", "坂田", "末永", "五島", "松尾"];

export default function TablePage() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const player = playersList[index];

  useEffect(()=>{
    const saved = localStorage.getItem("pitchData");
    if(saved) setData(JSON.parse(saved));
  },[]);

  const today = new Date().toISOString().split("T")[0];

  const filtered = data
    .map((d,i)=>({...d,i}))
    .filter(d=>d.player===player)
    .sort((a,b)=>new Date(b.date)-new Date(a.date));

  const hasToday = filtered.some(d=>d.date===today);

  // 🔥 週間球数
  const weekly = filtered
    .filter(d=>{
      const now = new Date();
      const weekAgo = new Date();
      weekAgo.setDate(now.getDate()-7);
      return new Date(d.date) >= weekAgo;
    })
    .reduce((sum,d)=>sum+d.pitches,0);

  const del = (i)=>{
    const newData=[...data];
    newData.splice(i,1);
    setData(newData);
    localStorage.setItem("pitchData",JSON.stringify(newData));
  };

  return (
    <div style={bg}>
      <div style={container}>
        <h1 style={{textAlign:"center"}}>📊 結果</h1>

        {/* 選手切り替え */}
        <div style={switchBox}>
          <button onClick={()=>setIndex(index===0?4:index-1)} style={arrowBtn}>←</button>
          <b style={{fontSize:22}}>{player}</b>
          <button onClick={()=>setIndex((index+1)%5)} style={arrowBtn}>→</button>
        </div>

        {/* 🔥 まとめカード */}
        <div style={{
          background: weekly > 300 ? "#fee2e2" : "#e0f2fe",
          padding:20,
          borderRadius:20,
          marginBottom:15,
          textAlign:"center",
          boxShadow:"0 4px 10px rgba(0,0,0,0.08)"
        }}>
          <div style={{ fontSize:14, color:"#555" }}>
            直近1週間
          </div>

          <div style={{ fontSize:28, fontWeight:"bold" }}>
            {weekly} 球
          </div>

          {weekly > 300 && (
            <div style={{
              color:"red",
              fontWeight:"bold",
              marginTop:5
            }}>
              ⚠ 投げすぎ注意
            </div>
          )}
        </div>

        {/* 今日未入力 */}
        {!hasToday && (
          <div style={warn}>⚠ 今日の入力がありません</div>
        )}

        {/* データ一覧 */}
        {filtered.length === 0 ? (
          <div style={{ textAlign:"center", color:"#666" }}>
            データなし
          </div>
        ) : (
          filtered.map(d=>(
            <div key={d.i} style={{
              ...card,
              background:(d.shoulder==="×"||d.elbow==="×")?"#fee2e2":"white"
            }}>
              <button onClick={()=>del(d.i)} style={delBtn}>✖</button>

              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <div>{d.date}</div>
                <div style={{ fontSize:20, fontWeight:"bold" }}>
                  {d.pitches}球
                </div>
              </div>

              <div style={{ marginTop:5 }}>
                肩：
                <span style={{ color: colorState(d.shoulder) }}>
                  {d.shoulder}
                </span>
                ／ 肘：
                <span style={{ color: colorState(d.elbow) }}>
                  {d.elbow}
                </span>
              </div>
            </div>
          ))
        )}

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

/* ---------- スタイル ---------- */

const bg = {
  minHeight:"100vh",
  background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",
  padding:20
};

const container = {
  maxWidth:500,
  margin:"0 auto"
};

const switchBox = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:15
};

const arrowBtn = {
  padding:"14px 20px",
  fontSize:22,
  borderRadius:12,
  background:"#3b82f6",
  color:"white"
};

const warn = {
  background:"#fef3c7",
  padding:12,
  borderRadius:12,
  marginBottom:10,
  textAlign:"center"
};

const card = {
  padding:15,
  borderRadius:15,
  marginBottom:10,
  boxShadow:"0 4px 10px rgba(0,0,0,0.05)"
};

const delBtn = {
  float:"right",
  background:"red",
  color:"white",
  borderRadius:8
};

const navBtn = (bg)=>({
  flex:1,
  padding:12,
  borderRadius:12,
  background:bg,
  color:"white",
  fontWeight:"bold"
});

/* 状態の色 */
const colorState = (s)=>{
  if(s==="○") return "#3b82f6";
  if(s==="△") return "#facc15";
  return "#ef4444";
};
