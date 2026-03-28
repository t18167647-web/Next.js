"use client";
import { useEffect, useState } from "react";

const playersList = ["熊", "坂田", "末永", "五島", "松尾"];

export default function TablePage() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(0);

  const selectedPlayer = playersList[index];

  useEffect(() => {
    const saved = localStorage.getItem("pitchData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  const today = new Date().toISOString().split("T")[0];

  const filtered = data
    .map((d,i)=>({...d, originalIndex:i}))
    .filter(d => d.player===selectedPlayer)
    .sort((a,b)=>new Date(b.date)-new Date(a.date));

  const hasToday = filtered.some(d=>d.date===today);

  const getWeekly = ()=>{
    const now=new Date();
    const weekAgo=new Date();
    weekAgo.setDate(now.getDate()-7);

    return filtered
      .filter(d=>new Date(d.date)>=weekAgo)
      .reduce((sum,d)=>sum+d.pitches,0);
  };

  const deleteData = (i)=>{
    const newData=[...data];
    newData.splice(i,1);
    setData(newData);
    localStorage.setItem("pitchData", JSON.stringify(newData));
  };

  return (
    <div style={{ padding:20, maxWidth:500, margin:"0 auto" }}>
      <h1 style={{ textAlign:"center" }}>結果</h1>

      {/* 切り替え */}
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
        <button onClick={()=>setIndex(index===0?4:index-1)}>←</button>
        <b>{selectedPlayer}</b>
        <button onClick={()=>setIndex((index+1)%5)}>→</button>
      </div>

      {!hasToday && (
        <div style={{ background:"#fff3cd", padding:10, borderRadius:10 }}>
          ⚠ 今日未入力
        </div>
      )}

      <div style={{ background:"#eee", padding:10, borderRadius:10, margin:"10px 0" }}>
        1週間：{getWeekly()}球
      </div>

      {filtered.map((d,i)=>(
        <div key={i} style={{
          background: (d.shoulder==="×"||d.elbow==="×") ? "#ffe5e5":"#f9f9f9",
          padding:10, borderRadius:10, marginBottom:10
        }}>
          <button onClick={()=>deleteData(d.originalIndex)}
            style={{ float:"right", background:"red", color:"white" }}>
            削除
          </button>

          <div>{d.date}</div>
          <div style={{ fontSize:20 }}>{d.pitches}球</div>
          <div>肩:{d.shoulder} / 肘:{d.elbow}</div>
        </div>
      ))}

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
