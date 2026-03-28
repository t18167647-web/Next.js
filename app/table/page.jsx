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

  const del = (i)=>{
    const newData=[...data];
    newData.splice(i,1);
    setData(newData);
    localStorage.setItem("pitchData",JSON.stringify(newData));
  };

  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",
      padding:20
    }}>
      <div style={{ maxWidth:500, margin:"0 auto" }}>
        <h1 style={{textAlign:"center"}}>📊 結果</h1>

        {/* 🔥 矢印でかく */}
        <div style={{
          display:"flex",
          justifyContent:"space-between",
          alignItems:"center",
          marginBottom:15
        }}>
          <button onClick={()=>setIndex(index===0?4:index-1)}
            style={arrowBtn}>
            ←
          </button>

          <div style={{ fontSize:20, fontWeight:"bold" }}>
            {player}
          </div>

          <button onClick={()=>setIndex((index+1)%5)}
            style={arrowBtn}>
            →
          </button>
        </div>

        {!hasToday && (
          <div style={{
            background:"#fef3c7",
            padding:10,
            borderRadius:10,
            marginBottom:10
          }}>
            ⚠ 今日未入力
          </div>
        )}

        {filtered.map(d=>(
          <div key={d.i} style={{
            background:(d.shoulder==="×"||d.elbow==="×")?"#fee2e2":"white",
            padding:15,
            borderRadius:15,
            marginBottom:10,
            boxShadow:"0 4px 10px rgba(0,0,0,0.05)"
          }}>
            <button onClick={()=>del(d.i)}
              style={delBtn}>
              ✖
            </button>

            <div>{d.date}</div>
            <div style={{fontSize:22}}>{d.pitches}球</div>
            <div>肩:{d.shoulder} / 肘:{d.elbow}</div>
          </div>
        ))}

        {/* 🔥 ナビ（文字つき） */}
        <div style={{display:"flex",gap:10,marginTop:20}}>
          <a href="/"><button style={navBtn("#222")}>🏠 ホーム</button></a>
          <a href="/input"><button style={navBtn("#3b82f6")}>✏️ 入力</button></a>
          <a href="/table"><button style={navBtn("#22c55e")}>📊 結果</button></a>
        </div>
      </div>
    </div>
  );
}

const arrowBtn = {
  padding:"12px 18px",
  fontSize:20,
  borderRadius:10,
  background:"#3b82f6",
  color:"white"
};

const delBtn = {
  float:"right",
  background:"red",
  color:"white",
  borderRadius:8,
  padding:"5px 8px"
};

const navBtn = (bg)=>({
  flex:1,
  padding:12,
  borderRadius:12,
  background:bg,
  color:"white",
  fontWeight:"bold"
});
