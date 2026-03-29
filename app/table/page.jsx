"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TablePage(){
  const [data,setData]=useState([]);
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);

  const [messages,setMessages]=useState({});
  const [text,setText]=useState("");

  useEffect(()=>{
    try{
      setData(JSON.parse(localStorage.getItem("pitchData")||"[]"));
      setPlayers(JSON.parse(localStorage.getItem("players")||"[]"));
      setMessages(JSON.parse(localStorage.getItem("messages")||"{}"));
    }catch{
      setData([]);
      setPlayers([]);
      setMessages({});
    }
  },[]);

  if(players.length===0){
    return <div style={{padding:20}}>選手がいません</div>;
  }

  const player=players[index];
  const filtered=data.filter(d=>d.player===player);

  // ⭐ コメント送信（記録ごと）
  const send=(i)=>{
    if(!text) return;

    const updated={...messages};

    if(!updated[i]) updated[i]=[];

    updated[i].push({
      text,
      time:new Date().toLocaleString()
    });

    setMessages(updated);
    localStorage.setItem("messages",JSON.stringify(updated));
    setText("");
  };

  return(
    <div style={bg}>
      <div style={card}>

        {/* ナビ */}
        <div style={nav}>
          <Link href="/"><button>🏠</button></Link>

          <div>
            <button onClick={()=>setIndex((index-1+players.length)%players.length)}>◀</button>
            <span style={{margin:"0 10px"}}>{player}</span>
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

            <div>{d.comment}</div>

            {/* 🔥 コメント履歴 */}
            <div style={chatBox}>
              {(messages[i]||[]).map((m,idx)=>(
                <div key={idx} style={msg}>
                  {m.text}
                  <div style={time}>{m.time}</div>
                </div>
              ))}
            </div>

            {/* 入力 */}
            <div style={{display:"flex",gap:5}}>
              <input
                value={text}
                onChange={(e)=>setText(e.target.value)}
                placeholder="指導コメント"
                style={{flex:1}}
              />
              <button onClick={()=>send(i)}>送信</button>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
}

/* style */

const bg={padding:20,background:"#eef"};
const card={maxWidth:600,margin:"auto"};

const nav={display:"flex",justifyContent:"space-between",marginBottom:10};

const item={
  background:"white",
  padding:15,
  borderRadius:15,
  marginBottom:10
};

const mark=(v)=>({
  marginRight:10,
  fontSize:20,
  color:v==="○"?"blue":v==="△"?"orange":"red"
});

const chatBox={
  marginTop:10,
  padding:10,
  background:"#f1f5f9",
  borderRadius:10
};

const msg={
  background:"#fee2e2",
  padding:8,
  borderRadius:8,
  marginBottom:5
};

const time={fontSize:10};
