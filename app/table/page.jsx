"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TablePage(){
  const [data,setData]=useState([]);
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);

  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem("pitchData")||"[]"));
    setPlayers(JSON.parse(localStorage.getItem("players")||"[]"));
  },[]);

  if(players.length===0){
    return <div style={{padding:20}}>選手がいません</div>;
  }

  const player=players[index];
  const filtered=data.filter(d=>d.player===player);

  return(
    <div style={bg}>
      <div style={card}>

        {/* ナビ */}
        <div style={nav}>
          <Link href="/"><button>🏠</button></Link>

          <div>
            <button onClick={()=>setIndex((index-1+players.length)%players.length)}>◀</button>
            <span style={{margin:"0 10px",fontWeight:"bold"}}>{player}</span>
            <button onClick={()=>setIndex((index+1)%players.length)}>▶</button>
          </div>

          <Link href="/input"><button>✏️</button></Link>
        </div>

        <h2>📊 結果</h2>

        {filtered.map((d,i)=>(
          <div key={i} style={item}>
            <div style={{fontWeight:"bold"}}>
              {d.date} / {d.type}
            </div>

            <div style={{fontSize:20}}>
              {d.pitches}球
            </div>

            <div>
              <span style={mark(d.shoulder)}>{d.shoulder}</span>
              <span style={mark(d.elbow)}>{d.elbow}</span>
            </div>

            <div style={{marginTop:5}}>
              {d.comment}
            </div>
          </div>
        ))}

      </div>
    </div>
  );
}

const bg={padding:20,background:"#eef"};
const card={maxWidth:600,margin:"auto"};

const nav={display:"flex",justifyContent:"space-between",marginBottom:10};

const item={
  background:"white",
  padding:15,
  borderRadius:15,
  marginBottom:10,
  boxShadow:"0 5px 10px rgba(0,0,0,0.1)"
};

const mark=(v)=>({
  marginRight:10,
  fontSize:22,
  color:v==="○"?"blue":v==="△"?"orange":"red"
});
