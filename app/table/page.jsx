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
    <div style={bg}>
      <div style={container}>
        <h1 style={{textAlign:"center"}}>📊 結果</h1>

        <div style={switchBox}>
          <button onClick={()=>setIndex(index===0?4:index-1)}>←</button>
          <b>{player}</b>
          <button onClick={()=>setIndex((index+1)%5)}>→</button>
        </div>

        {!hasToday && (
          <div style={warn}>⚠ 今日未入力</div>
        )}

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

const switchBox = {
  display:"flex",
  justifyContent:"space-between",
  marginBottom:10
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
