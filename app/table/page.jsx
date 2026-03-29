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
    try{
      setData(JSON.parse(localStorage.getItem("pitchData")||"[]"));
      setPlayers(JSON.parse(localStorage.getItem("players")||"[]"));
      setMessages(JSON.parse(localStorage.getItem("messages")||"[]"));
    }catch{
      setData([]);
      setPlayers([]);
      setMessages([]);
    }
  },[]);

  if(players.length===0){
    return <div style={{padding:20}}>選手がいません</div>;
  }

  const player=players[index];

  const filtered=data.filter(d=>d.player===player);
  const playerMessages=messages.filter(m=>m.player===player);

  // コメント送信
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

        {/* 🔥 ナビ */}
        <div style={nav}>
          <Link href="/"><button style={navBtn}>🏠 ホーム</button></Link>

          <div>
            <button onClick={()=>setIndex((index-1+players.length)%players.length)}>◀</button>
            <span style={playerName}>{player}</span>
            <button onClick={()=>setIndex((index+1)%players.length)}>▶</button>
          </div>

          <Link href="/input"><button style={navBtn}>✏️ 入力</button></Link>
        </div>

        <h2 style={title}>📊 結果</h2>

        {/* 記録 */}
        {filtered.map((d,i)=>(
          <div key={i} style={item}>
            <div style={date}>{d.date} / {d.type}</div>
            <div style={pitches}>{d.pitches}球</div>

            <div>
              <span style={mark(d.shoulder)}>{d.shoulder}</span>
              <span style={mark(d.elbow)}>{d.elbow}</span>
            </div>

            <div style={comment}>{d.comment}</div>
          </div>
        ))}

        {/* 🔥 コメント欄 */}
        <h3 style={{marginTop:20}}>💬 指導コメント</h3>

        <div style={chatBox}>
          {playerMessages.map((m,i)=>(
            <div key={i} style={chatMsg}>
              <div>{m.text}</div>
              <div style={time}>{m.time}</div>
            </div>
          ))}
        </div>

        {/* 入力 */}
        <div style={inputBox}>
          <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="コメント入力"
            style={chatInput}
          />
          <button onClick={send} style={sendBtn}>送信</button>
        </div>

      </div>
    </div>
  );
}

/* ===== デザイン ===== */

const bg={
  minHeight:"100vh",
  padding:20,
  background:"linear-gradient(135deg,#dbeafe,#f0fdf4)"
};

const card={
  maxWidth:600,
  margin:"auto",
  background:"white",
  padding:20,
  borderRadius:20,
  boxShadow:"0 10px 20px rgba(0,0,0,0.1)"
};

const nav={
  display:"flex",
  justifyContent:"space-between",
  alignItems:"center",
  marginBottom:10
};

const navBtn={
  padding:"6px 12px",
  borderRadius:8
};

const playerName={
  margin:"0 10px",
  fontWeight:"bold",
  fontSize:18
};

const title={textAlign:"center"};

const item={
  background:"#f9fafb",
  padding:15,
  borderRadius:15,
  marginBottom:10
};

const date={fontWeight:"bold"};

const pitches={fontSize:20};

const mark=(v)=>({
  marginRight:10,
  fontSize:22,
  color:v==="○"?"#3b82f6":v==="△"?"#facc15":"#ef4444"
});

const comment={marginTop:5};

const chatBox={
  height:200,
  overflowY:"auto",
  background:"#f1f5f9",
  padding:10,
  borderRadius:10,
  display:"flex",
  flexDirection:"column",
  gap:10
};

const chatMsg={
  alignSelf:"flex-end",
  background:"#fee2e2",
  padding:10,
  borderRadius:10,
  maxWidth:"70%"
};

const time={
  fontSize:10,
  marginTop:5,
  opacity:0.6
};

const inputBox={
  display:"flex",
  marginTop:10,
  gap:5
};

const chatInput={
  flex:1,
  height:40,
  borderRadius:10,
  padding:"0 10px"
};

const sendBtn={
  width:70,
  borderRadius:10,
  background:"#3b82f6",
  color:"white"
};
