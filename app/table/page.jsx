"use client";
import { useEffect, useState } from "react";

export default function TablePage(){
  const [data,setData]=useState([]);
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);

  useEffect(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem("pitchData")||"[]");
      const playerList=JSON.parse(localStorage.getItem("players")||"[]");

      setData(saved);
      setPlayers(playerList);
    }catch{
      setData([]);
      setPlayers([]);
    }
  },[]);

  if(players.length===0){
    return <div style={{padding:20}}>選手がいません（入力ページで追加）</div>;
  }

  const player=players[index];

  const filtered=data.filter(d=>d.player===player);

  const total=filtered.reduce((sum,d)=>sum+d.pitches,0);

  return(
    <div style={bg}>
      <div style={card}>
        <h2>📊 結果</h2>

        <div style={nav}>
          <button onClick={()=>setIndex((index-1+players.length)%players.length)}>◀</button>
          <h3>{player}</h3>
          <button onClick={()=>setIndex((index+1)%players.length)}>▶</button>
        </div>

        <div>週間合計: {total}球 {total>300 && "⚠️多い！"}</div>

        {filtered.map((d,i)=>(
          <div key={i} style={item}>
            <div>{d.date} / {d.type}</div>
            <div>{d.pitches}球</div>
            <div>
              <span style={mark(d.shoulder)}>{d.shoulder}</span>
              <span style={mark(d.elbow)}>{d.elbow}</span>
            </div>
            <div>{d.comment}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const bg={minHeight:"100vh",padding:20,background:"#eef"};
const card={maxWidth:600,margin:"auto",background:"white",padding:20,borderRadius:20};

const nav={display:"flex",justifyContent:"space-between",alignItems:"center"};

const item={borderBottom:"1px solid #ccc",padding:10};

const mark=(v)=>({
  marginRight:10,
  fontSize:20,
  color:v==="○"?"blue":v==="△"?"orange":"red"
});
