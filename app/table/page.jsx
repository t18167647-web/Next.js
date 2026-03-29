"use client";
import { useEffect, useState } from "react";

export default function TablePage() {
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);
  const [data,setData]=useState([]);
  const [messages,setMessages]=useState([]);

  const [text,setText]=useState("");
  const [role,setRole]=useState("監督");

  const player=players[index];

  useEffect(()=>{
    setPlayers(JSON.parse(localStorage.getItem("players")||"[]"));
    setData(JSON.parse(localStorage.getItem("pitchData")||"[]"));
    setMessages(JSON.parse(localStorage.getItem("messages")||"[]"));
  },[]);

  if(!players.length) return null;

  const filtered=data.filter(d=>d.player===player);

  const playerMessages=messages.filter(m=>m.player===player);

  const lastSeen=localStorage.getItem("seen_"+player);
  const hasUnread=playerMessages.some(m=>!lastSeen || new Date(m.time)>new Date(lastSeen));

  useEffect(()=>{
    localStorage.setItem("seen_"+player,new Date().toISOString());
  },[player]);

  const send=()=>{
    if(!text) return;

    const newMsg={
      player,
      text,
      role,
      time:new Date().toISOString()
    };

    const updated=[...messages,newMsg];
    setMessages(updated);
    localStorage.setItem("messages",JSON.stringify(updated));
    setText("");
  };

  const typeColor=(type)=>{
    if(type==="ブルペン") return "#e0f2fe";
    if(type==="実戦練習") return "#fef9c3";
    if(type==="試合") return "#fee2e2";
  };

  return (
    <div style={bg}>
      <div style={container}>
        <h1>結果</h1>

        {hasUnread && <div style={{color:"red"}}>● 未読あり</div>}

        <button onClick={()=>setIndex(index===0?players.length-1:index-1)}>←</button>
        {player}
        <button onClick={()=>setIndex((index+1)%players.length)}>→</button>

        {/* データ */}
        {filtered.map((d,i)=>(
          <div key={i} style={{background:typeColor(d.type),padding:10,marginTop:10}}>
            {d.date} / {d.pitches}球 / {d.type}
          </div>
        ))}

        {/* チャット */}
        <div style={chatBox}>
          {playerMessages.map((m,i)=>(
            <div key={i} style={{
              ...msg,
              alignSelf:m.role==="監督"?"flex-end":"flex-start",
              background:m.role==="監督"?"#fee2e2":"#dbeafe"
            }}>
              {m.text}
            </div>
          ))}
        </div>

        <div style={{display:"flex"}}>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option>監督</option>
            <option>選手</option>
          </select>

          <input value={text} onChange={(e)=>setText(e.target.value)} style={{flex:1}}/>
          <button onClick={send}>送信</button>
        </div>
      </div>
    </div>
  );
}

const bg={padding:20};
const container={maxWidth:500,margin:"0 auto"};

const chatBox={height:200,overflow:"auto",display:"flex",flexDirection:"column",gap:5};
const msg={padding:10,borderRadius:10,maxWidth:"70%"};
