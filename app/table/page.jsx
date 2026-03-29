"use client";
import { useEffect, useState } from "react";

export default function TablePage() {
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);
  const [data,setData]=useState([]);

  const player=players[index];

  useEffect(()=>{
    setPlayers(JSON.parse(localStorage.getItem("players")||"[]"));
    setData(JSON.parse(localStorage.getItem("pitchData")||"[]"));
  },[]);

  if(!players.length) return null;

  const filtered=data
    .map((d,i)=>({...d,i}))
    .filter(d=>d.player===player)
    .sort((a,b)=>new Date(b.date)-new Date(a.date));

  const weekly=filtered
    .filter(d=>{
      const now=new Date();
      const weekAgo=new Date();
      weekAgo.setDate(now.getDate()-7);
      return new Date(d.date)>=weekAgo;
    })
    .reduce((sum,d)=>sum+d.pitches,0);

  const del=(i)=>{
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
          <button onClick={()=>setIndex(index===0?players.length-1:index-1)}>←</button>

          <select value={player}
            onChange={(e)=>setIndex(players.indexOf(e.target.value))}>
            {players.map(p=><option key={p}>{p}</option>)}
          </select>

          <button onClick={()=>setIndex((index+1)%players.length)}>→</button>
        </div>

        <div style={{
          background:weekly>300?"#fee2e2":"#e0f2fe",
          padding:15,
          borderRadius:15,
          textAlign:"center",
          marginBottom:10
        }}>
          {weekly}球（1週間）
          {weekly>300 && <div style={{color:"red"}}>⚠ 投げすぎ</div>}
        </div>

        {filtered.map(d=>(
          <div key={d.i} style={{
            ...card,
            background:(d.shoulder==="×"||d.elbow==="×")?"#fee2e2":"white"
          }}>
            <button onClick={()=>del(d.i)} style={del}>✖</button>

            <div>{d.date} {d.pitches}球</div>

            <div>
              肩:<span style={state(d.shoulder)}>{d.shoulder}</span>
              ／ 肘:<span style={state(d.elbow)}>{d.elbow}</span>
            </div>

            {/* 🔥 コメント表示 */}
            {d.comment && (
              <div style={commentBox}>
                💬 {d.comment}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* スタイル */

const bg={minHeight:"100vh",background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",padding:20};
const container={maxWidth:500,margin:"0 auto"};
const switchBox={display:"flex",gap:10,marginBottom:10};
const card={padding:15,borderRadius:15,marginBottom:10};
const del={float:"right",background:"red",color:"white"};

const state=(s)=>({
  fontSize:20,
  fontWeight:"bold",
  marginLeft:5,
  color: s==="○"?"#3b82f6":s==="△"?"#facc15":"#ef4444"
});

/* コメント */
const commentBox={
  marginTop:10,
  padding:10,
  background:"#f1f5f9",
  borderRadius:10
};
