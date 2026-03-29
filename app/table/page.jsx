"use client";
import { useEffect, useState } from "react";

export default function TablePage(){
  const [data,setData]=useState([]);
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);

  const [messages,setMessages]=useState([]);
  const [text,setText]=useState("");

  useEffect(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem("pitchData")||"[]");
      const playerList=JSON.parse(localStorage.getItem("players")||"[]");
      const msg=JSON.parse(localStorage.getItem("messages")||"[]");

      setData(saved);
      setPlayers(playerList);
      setMessages(msg);
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

  const total=filtered.reduce((sum,d)=>sum+d.pitches,0);

  // ⭐ コメント送信
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
        <h2>📊 結果</h2>

        {/* 選手切替 */}
        <div style={nav}>
          <button onClick={()=>setIndex((index-1+players.length)%players.length)}>◀</button>
          <h3>{player}</h3>
          <button onClick={()=>setIndex((index+1)%players.length)}>▶</button>
        </div>

        {/* 球数 */}
        <div style={{marginBottom:10}}>
          週間合計: {total}球 {total>300 && "⚠️多い"}
        </div>

        {/* データ */}
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

        {/* 🔥 チャット */}
        <h3 style={{marginTop:20}}>💬 コメント</h3>

        <div style={chatBox}>
          {playerMessages.map((m,i)=>(
            <div key={i} style={{
              ...msg,
              alignSelf:"flex-end",
              background:"#fee2e2"
            }}>
              {m.text}
              <div style={time}>{m.time}</div>
            </div>
          ))}
        </div>

        {/* 入力 */}
        <div style={inputBox}>
          <input
            value={text}
            onChange={(e)=>setText(e.target.value)}
            placeholder="指導コメント"
            style={{flex:1}}
          />
          <button onClick={send}>送信</button>
        </div>

      </div>
    </div>
  );
}

/* style */

const bg={minHeight:"100vh",padding:20,background:"#eef"};
const card={maxWidth:600,margin:"auto",background:"white",padding:20,borderRadius:20};

const nav={display:"flex",justifyContent:"space-between",alignItems:"center"};

const item={borderBottom:"1px solid #ccc",padding:10};

const mark=(v)=>({
  marginRight:10,
  fontSize:20,
  color:v==="○"?"blue":v==="△"?"orange":"red"
});

const chatBox={
  height:200,
  overflow:"auto",
  display:"flex",
  flexDirection:"column",
  gap:10,
  background:"#fff",
  padding:10,
  borderRadius:10
};

const msg={
  padding:10,
  borderRadius:10,
  maxWidth:"70%"
};

const time={
  fontSize:10,
  marginTop:5
};

const inputBox={
  display:"flex",
  marginTop:10,
  gap:5
};
