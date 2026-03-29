"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TablePage(){
  const [data,setData]=useState([]);
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);

  const [messages,setMessages]=useState([]);
  const [text,setText]=useState("");

  useEffect(()=>{
    setData(JSON.parse(localStorage.getItem("pitchData")||"[]"));
    setPlayers(JSON.parse(localStorage.getItem("players")||"[]"));
    setMessages(JSON.parse(localStorage.getItem("messages")||"[]"));
  },[]);

  if(players.length===0){
    return <div style={{padding:20}}>選手がいません</div>;
  }

  const player=players[index];
  const filtered=data.filter(d=>d.player===player);
  const playerMessages=messages.filter(m=>m.player===player);

  const send=()=>{
    if(!text) return;

    const newMsg={
      player,
      text,
      role:"監督",
      time:new Date().toLocaleString()
    };

    const updated=[...messages,newMsg];
    setMessages(updated);
    localStorage.setItem("messages",JSON.stringify(updated));
    setText("");
  };

  return(
    <div style={bg}>
      <div style={card}>

        {/* 🔥 上固定ナビ */}
        <div style={nav}>
          <Link href="/"><button>🏠 ホーム</button></Link>

          <div>
            <button onClick={()=>setIndex((index-1+players.length)%players.length)}>◀</button>
            <span style={{margin:"0 10px"}}>{player}</span>
            <button onClick={()=>setIndex((index+1)%players.length)}>▶</button>
          </div>

          <Link href="/input"><button>✏️ 入力</button></Link>
        </div>

        <h2>📊 結果</h2>

        {filtered.map((d,i)=>(
          <div key={i} style={item}>
            {d.date} / {d.type} / {d.pitches}球
          </div>
        ))}

        <h3>💬 コメント</h3>

        <div style={chatBox}>
          {playerMessages.map((m,i)=>(
            <div key={i} style={msg}>{m.text}</div>
          ))}
        </div>

        <div style={{display:"flex"}}>
          <input value={text} onChange={(e)=>setText(e.target.value)} style={{flex:1}}/>
          <button onClick={send}>送信</button>
        </div>

      </div>
    </div>
  );
}

const bg={padding:20};
const card={maxWidth:600,margin:"auto"};

const nav={
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:10
};

const item={padding:10,borderBottom:"1px solid #ccc"};

const chatBox={height:150,overflow:"auto",background:"#fff",marginBottom:10};

const msg={padding:10};
