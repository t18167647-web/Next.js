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

        {/* 切り替え */}
        <div style={switchBox}>
          <button onClick={()=>setIndex(index===0?4:index-1)} style={arrowBtn}>←</button>

          <select value={player}
            onChange={(e)=>setIndex(playersList.indexOf(e.target.value))}
            style={selectStyle}>
            {playersList.map(p=><option key={p}>{p}</option>)}
          </select>

          <button onClick={()=>setIndex((index+1)%5)} style={arrowBtn}>→</button>
        </div>

        {/* 週間 */}
        <div style={{
          background: weekly>300 ? "#fee2e2":"#e0f2fe",
          padding:20,
          borderRadius:20,
          marginBottom:15,
          textAlign:"center"
        }}>
          <div>直近1週間</div>
          <div style={{ fontSize:28, fontWeight:"bold" }}>{weekly}球</div>
          {weekly>300 && <div style={{color:"red"}}>⚠ 投げすぎ</div>}
        </div>

        {!hasToday && <div style={warn}>⚠ 今日未入力</div>}

        {filtered.map(d=>(
          <div key={d.i} style={{
            ...card,
            background:(d.shoulder==="×"||d.elbow==="×")?"#fee2e2":"white"
          }}>
            <button onClick={()=>del(d.i)} style={delBtn}>✖</button>

            <div style={{display:"flex",justifyContent:"space-between"}}>
              <div>{d.date}</div>
              <div style={{fontSize:20,fontWeight:"bold"}}>{d.pitches}球</div>
            </div>

            <div style={{
              marginTop:8,
              display:"flex",
              justifyContent:"space-between"
            }}>
              <div>肩：<span style={statusStyle(d.shoulder)}>{d.shoulder}</span></div>
              <div>肘：<span style={statusStyle(d.elbow)}>{d.elbow}</span></div>
            </div>
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

/* スタイル */

const bg={minHeight:"100vh",background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",padding:20};
const container={maxWidth:500,margin:"0 auto"};
const switchBox={display:"flex",gap:10,marginBottom:15};
const arrowBtn={padding:"12px 18px",fontSize:20,background:"#3b82f6",color:"white",borderRadius:10};
const selectStyle={flex:1,padding:10,borderRadius:10};
const warn={background:"#fef3c7",padding:10,borderRadius:10,marginBottom:10,textAlign:"center"};
const card={padding:15,borderRadius:15,marginBottom:10,boxShadow:"0 4px 10px rgba(0,0,0,0.05)"};
const delBtn={float:"right",background:"red",color:"white",borderRadius:8};
const navBtn=(bg)=>({flex:1,padding:12,borderRadius:12,background:bg,color:"white",fontWeight:"bold"});

const statusStyle=(s)=>({
  fontSize:28,
  fontWeight:"bold",
  marginLeft:5,
  color: s==="○"?"#3b82f6": s==="△"?"#facc15":"#ef4444"
});
