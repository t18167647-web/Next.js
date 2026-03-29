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
  const filtered=data.filter(d=>d && d.player===player);

  const getId=(d,i)=>`${d.player}-${d.date}-${i}`;

  const handleChange=(id,value)=>{
    setInputs(prev=>({...prev,[id]:value}));
  };

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

  // ⭐ 削除機能
  const deleteData=(target)=>{
    if(!confirm("削除する？")) return;

    const newData = data.filter(d=>d !== target);
    setData(newData);
    localStorage.setItem("pitchData",JSON.stringify(newData));

    // コメントも削除
    const newMessages={...messages};
    Object.keys(newMessages).forEach(key=>{
      if(key.includes(target.date)) delete newMessages[key];
    });
    setMessages(newMessages);
    localStorage.setItem("messages",JSON.stringify(newMessages));
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

              {/* 上段 */}
              <div style={{display:"flex",justifyContent:"space-between"}}>
                <div>
                  <div style={{fontWeight:"bold"}}>
                    {d.date} / {d.type}
                  </div>
                  <div style={{fontSize:20}}>
                    {d.pitches}球
                  </div>
                </div>

                <button onClick={()=>deleteData(d)} style={deleteBtn}>
                  🗑
                </button>
              </div>

              {/* 🔥 肩・肘 */}
              <div style={{marginTop:10}}>
                <span style={label}>肩:</span>
                <span style={mark(d.shoulder)}>{d.shoulder}</span>

                <span style={label}>肘:</span>
                <span style={mark(d.elbow)}>{d.elbow}</span>
              </div>

              <div style={{marginTop:5}}>
                {d.comment}
              </div>

              {/* コメント */}
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
  marginBottom:10,
  boxShadow:"0 5px 10px rgba(0,0,0,0.1)"
};

const label={
  fontWeight:"bold",
  marginRight:5
};

const mark=(v)=>({
  marginRight:15,
  fontSize:20,
  color:v==="○"?"blue":v==="△"?"orange":"red"
});

const deleteBtn={
  background:"#ef4444",
  color:"white",
  borderRadius:10,
  padding:"5px 10px"
};

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
