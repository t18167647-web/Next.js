"use client";
import { useEffect, useState } from "react";

export default function TablePage() {
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);
  const [data,setData]=useState([]);
  const [messages,setMessages]=useState([]);

  const [text,setText]=useState("");
  const [role,setRole]=useState("監督");

  const player=players[index] || "";

  useEffect(()=>{
    const p = JSON.parse(localStorage.getItem("players")||"[]");
    const d = JSON.parse(localStorage.getItem("pitchData")||"[]");
    const m = JSON.parse(localStorage.getItem("messages")||"[]");

    setPlayers(p);
    setData(d);
    setMessages(m);
  },[]);

  if(!players.length){
    return <div style={{padding:20}}>選手データがありません</div>;
  }

  // データ
  const filtered=data
    .filter(d=>d && d.player===player)
    .sort((a,b)=>new Date(b.date)-new Date(a.date));

  // チャット
  const playerMessages=messages.filter(m=>m && m.player===player);

  // 未読
  const lastSeen=localStorage.getItem("seen_"+player);
  const hasUnread=playerMessages.some(m=>{
    if(!m.time) return false;
    if(!lastSeen) return true;
    return new Date(m.time) > new Date(lastSeen);
  });

  useEffect(()=>{
    if(player){
      localStorage.setItem("seen_"+player,new Date().toISOString());
    }
  },[player]);

  // 送信
  const send=()=>{
    if(!text.trim()) return;

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

  // 色
  const typeColor=(type)=>{
    if(type==="ブルペン") return "#e0f2fe";
    if(type==="実戦練習") return "#fef9c3";
    if(type==="試合") return "#fee2e2";
    return "#fff";
  };

  return (
    <div style={bg}>
      <div style={container}>
        <h1 style={{textAlign:"center"}}>📊 結果</h1>

        {/* 未読 */}
        {hasUnread && (
          <div style={unread}>● 未読あり</div>
        )}

        {/* 切替 */}
        <div style={switchBox}>
          <button onClick={()=>setIndex(index===0?players.length-1:index-1)}>←</button>

          <div style={{fontWeight:"bold"}}>{player}</div>

          <button onClick={()=>setIndex((index+1)%players.length)}>→</button>
        </div>

        {/* データ */}
        {filtered.length===0 && (
          <div style={empty}>データなし</div>
        )}

        {filtered.map((d,i)=>(
          <div key={i} style={{
            ...card,
            background:typeColor(d.type)
          }}>
            <div style={row}>
              <div>{d.date || "-"}</div>
              <div style={pitch}>{d.pitches || 0}球</div>
            </div>

            <div style={type}>{d.type || "-"}</div>

            <div style={row}>
              <div>肩：{d.shoulder || "-"}</div>
              <div>肘：{d.elbow || "-"}</div>
            </div>

            {d.comment && (
              <div style={comment}>
                💬 {d.comment}
              </div>
            )}
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
              <div>{m.text}</div>
            </div>
          ))}
        </div>

        {/* 入力 */}
        <div style={inputBox}>
          <select value={role} onChange={(e)=>setRole(e.target.value)}>
            <option>監督</option>
            <option>選手</option>
          </select>

          <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="コメント"
            style={{flex:1}}
          />

          <button onClick={send}>送信</button>
        </div>

      </div>
    </div>
  );
}

/* style */

const bg={
  minHeight:"100vh",
  background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",
  padding:20
};

const container={maxWidth:500,margin:"0 auto"};

const switchBox={
  display:"flex",
  justifyContent:"space-between",
  marginBottom:10
};

const unread={
  color:"red",
  fontWeight:"bold",
  marginBottom:10
};

const empty={
  textAlign:"center",
  marginBottom:10
};

const card={
  padding:12,
  borderRadius:12,
  marginBottom:10
};

const row={
  display:"flex",
  justifyContent:"space-between"
};

const pitch={
  fontWeight:"bold",
  fontSize:18
};

const type={
  marginTop:5,
  fontWeight:"bold"
};

const comment={
  marginTop:5,
  fontSize:14
};

const chatBox={
  height:200,
  overflowY:"auto",
  display:"flex",
  flexDirection:"column",
  gap:8,
  marginTop:10,
  background:"#fff",
  padding:10,
  borderRadius:10
};

const msg={
  padding:10,
  borderRadius:10,
  maxWidth:"70%"
};

const inputBox={
  display:"flex",
  gap:5,
  marginTop:10
};
