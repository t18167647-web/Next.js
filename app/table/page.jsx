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

  // 🔥 1週間の球数
  const getWeeklyTotal = ()=>{
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return filtered
      .filter(d => new Date(d.date) >= weekAgo)
      .reduce((sum,d)=>sum + d.pitches, 0);
  };

  const weekly = getWeeklyTotal();

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
          <b style={{fontSize:20}}>{player}</b>
          <button onClick={()=>setIndex((index+1)%5)} style={arrowBtn}>→</button>
        </div>

        {/* 🔥 週間球数 */}
        <div style={{
          background: weekly > 300 ? "#fecaca" : "#e0f2fe",
          padding:15,
          borderRadius:15,
          marginBottom:15,
          textAlign:"center",
          fontWeight:"bold"
        }}>
          1週間の投球数：{weekly}球
          {weekly > 300 && (
            <div style={{ color:"red", marginTop:5 }}>
              ⚠ 投げすぎ注意！
            </div>
          )}
        </div>

        {/* 今日未入力 */}
        {!hasToday && (
          <div style={warn}>⚠ 今日未入力</div>
        )}

        {/* データ */}
        {filtered.map(d=>(
          <div key={d.i} style={{
            ...card,
            background:(d.shoulder==="×"||d.elbow==="×")?"#fee2e2":"white"
          }}>
            <button onClick={()=>del(d.i)} style={delBtn}>✖</button>

            <div>{d.date}</div>
            <div style={{fontSize:22}}>{d.pitches}球</div>
            <div>肩:{d.shoulder} / 肘:{d.elbow}</div>
          </div>
        ))}

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

const switchBox = {
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:15
};

const arrowBtn = {
  padding:"12px 18px",
  fontSize:20,
  borderRadius:10,
  background:"#3b82f6",
  color:"white"
};

const warn = {
  background:"#fef3c7",
  padding:10,
  borderRadius:10,
  marginBottom:10
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
