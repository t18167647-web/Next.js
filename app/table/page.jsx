"use client";
import { useEffect, useState } from "react";

export default function TablePage() {
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);
  const [data,setData]=useState([]);
  const [messages,setMessages]=useState([]);

  const [text,setText]=useState("");
  const [role,setRole]=useState("監督");

  const player = players[index] || "";

  // 🔥 安全に読み込む関数
  const safeLoad = (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  };

  useEffect(()=>{
    setPlayers(safeLoad("players"));
    setData(safeLoad("pitchData"));
    setMessages(safeLoad("messages"));
  },[]);

  if(players.length === 0){
    return <div style={{padding:20}}>選手がいません（入力ページで追加）</div>;
  }

  // データ
  const filtered = data.filter(d => d && d.player === player);

  // メッセージ
  const playerMessages = messages.filter(m => m && m.player === player);

  // 未読
  const lastSeen = localStorage.getItem("seen_"+player);
  const hasUnread = playerMessages.some(m => {
    if(!m.time) return false;
    if(!lastSeen) return true;
    return new Date(m.time) > new Date(lastSeen);
  });

  useEffect(()=>{
    if(player){
      localStorage.setItem("seen_"+player,new Date().toISOString());
    }
  },[player]);

  const send = () => {
    if(!text.trim()) return;

    const newMsg = {
      player,
      text,
      role,
      time:new Date().toISOString()
    };

    const updated = [...messages, newMsg];
    setMessages(updated);
    localStorage.setItem("messages", JSON.stringify(updated));
    setText("");
  };

  const typeColor = (type) => {
    if(type==="ブルペン") return "#e0f2fe";
    if(type==="実戦練習") return "#fef9c3";
    if(type==="試合") return "#fee2e2";
    return "#fff";
  };

  return (
    <div style={{padding:20}}>
      <h1>📊 結果</h1>

      {hasUnread && <div style={{color:"red"}}>● 未読あり</div>}

      {/* 選手切替 */}
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <button onClick={()=>setIndex(index===0?players.length-1:index-1)}>←</button>
        <b>{player}</b>
        <button onClick={()=>setIndex((index+1)%players.length)}>→</button>
      </div>

      {/* データ */}
      {filtered.length === 0 && <div>データなし</div>}

      {filtered.map((d,i)=>(
        <div key={i} style={{
          padding:10,
          marginTop:10,
          borderRadius:10,
          background:typeColor(d.type)
        }}>
          <div>{d.date || "-"}</div>
          <div>{d.pitches || 0}球</div>
          <div>{d.type || "-"}</div>
          <div>肩:{d.shoulder || "-"} 肘:{d.elbow || "-"}</div>
          <div>{d.comment}</div>
        </div>
      ))}

      {/* チャット */}
      <div style={{
        height:200,
        overflow:"auto",
        background:"#fff",
        marginTop:10,
        padding:10
      }}>
        {playerMessages.map((m,i)=>(
          <div key={i} style={{
            textAlign:m.role==="監督"?"right":"left"
          }}>
            {m.text}
          </div>
        ))}
      </div>

      {/* 入力 */}
      <div style={{display:"flex",marginTop:10}}>
        <select value={role} onChange={(e)=>setRole(e.target.value)}>
          <option>監督</option>
          <option>選手</option>
        </select>

        <input
          value={text}
          onChange={(e)=>setText(e.target.value)}
          style={{flex:1}}
        />

        <button onClick={send}>送信</button>
      </div>
    </div>
  );
}
