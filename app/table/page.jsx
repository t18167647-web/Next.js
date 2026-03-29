"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TablePage(){
  const [data,setData]=useState([]);
  const [players,setPlayers]=useState([]);
  const [index,setIndex]=useState(0);

  const [messages,setMessages]=useState({});
  const [inputs,setInputs]=useState({});

  useEffect(()=>{
    try{
      const d = JSON.parse(localStorage.getItem("pitchData")||"[]");
      const p = JSON.parse(localStorage.getItem("players")||"[]");
      const m = JSON.parse(localStorage.getItem("messages")||"{}");

      setData(Array.isArray(d)?d:[]);
      setPlayers(Array.isArray(p)?p:[]);
      setMessages(m && typeof m==="object"?m:{});
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
  const filtered=data.filter(d=>d && d.player===player);

  // ⭐ 安全ID生成
  const getId=(d,i)=>`${d.player}-${d.date}-${i}`;

  // ⭐ 入力変更
  const handleChange=(id,value)=>{
    setInputs(prev=>({...prev,[id]:value}));
  };

  // ⭐ コメント送信
  const send=(id)=>{
    const text = inputs[id];
    if(!text) return;

    const updated={...messages};

    if(!updated[id]) updated[id]=[];

    updated[id].push({
      text,
      time:new Date().toLocaleString()
    });

    setMessages(updated);
    localStorage.setItem("messages",JSON.stringify(updated));

    setInputs(prev=>({...prev,[id]:""}));
  };

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

        {filtered.map((d,i)=>{
          const id = getId(d,i);
          const msgs = messages[id] || [];

          return(
            <div key={id} style={item}>

              <div style={{fontWeight:"bold"}}>
                {d.date || "-"} / {d.type || "-"}
              </div>

              <div style={{fontSize:20}}>
                {d.pitches || 0}球
              </div>

              <div>
                <span style={mark(d.shoulder)}>{d.shoulder || "-"}</span>
                <span style={mark(d.elbow)}>{d.elbow || "-"}</span>
              </div>

              <div>{d.comment || ""}</div>

              {/* コメント表示 */}
              <div style={chatBox}>
                {msgs.map((m,idx)=>(
                  <div key={idx} style={msg}>
                    {m.text}
                    <div style={time}>{m.time}</div>
                  </div>
                ))}
              </div>

              {/* 入力 */}
              <div style={{display:"flex",gap:5}}>
                <input
                  value={inputs[id] || ""}
                  onChange={(e)=>handleChange(id,e.target.value)}
                  placeholder="指導コメント"
                  style={{flex:1}}
                />
                <button onClick={()=>send(id)}>送信</button>
              </div>

            </div>
          );
        })}

      </div>
    </div>
  );
}

/* ===== style ===== */

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
