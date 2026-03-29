"use client";
import { useEffect, useState } from "react";

export default function InputPage() {
  const defaultPlayers=["熊","坂田","末永","五島","松尾"];

  const [players,setPlayers]=useState([]);
  const [newPlayer,setNewPlayer]=useState("");

  const [player,setPlayer]=useState("");
  const [date,setDate]=useState(new Date().toISOString().split("T")[0]);
  const [pitches,setPitches]=useState("");
  const [shoulder,setShoulder]=useState("○");
  const [elbow,setElbow]=useState("○");
  const [comment,setComment]=useState("");

  useEffect(()=>{
    const saved=JSON.parse(localStorage.getItem("players"));
    if(saved&&saved.length){
      setPlayers(saved);
      setPlayer(saved[0]);
    }else{
      setPlayers(defaultPlayers);
      setPlayer(defaultPlayers[0]);
      localStorage.setItem("players",JSON.stringify(defaultPlayers));
    }
  },[]);

  const addPlayer=()=>{
    if(!newPlayer) return;
    const updated=[...players,newPlayer];
    setPlayers(updated);
    localStorage.setItem("players",JSON.stringify(updated));
    setNewPlayer("");
  };

  const saveData=()=>{
    if(!pitches) return;

    const newData={
      player,
      date,
      pitches:Number(pitches),
      shoulder,
      elbow,
      comment
    };

    const saved=JSON.parse(localStorage.getItem("pitchData")||"[]");
    saved.push(newData);
    localStorage.setItem("pitchData",JSON.stringify(saved));

    setPitches("");
    setComment("");
    alert("保存しました");
  };

  return (
    <div style={bg}>
      <div style={container}>
        <h1 style={{textAlign:"center"}}>✏️ 入力</h1>

        <div style={card}>

          {/* 選手追加 */}
          <div style={{display:"flex",gap:10,marginBottom:10}}>
            <input value={newPlayer}
              onChange={(e)=>setNewPlayer(e.target.value)}
              placeholder="選手追加"
              style={{flex:1,padding:10}}
            />
            <button onClick={addPlayer}>追加</button>
          </div>

          <select value={player} onChange={(e)=>setPlayer(e.target.value)} style={input}>
            {players.map(p=><option key={p}>{p}</option>)}
          </select>

          <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={input}/>
          <input type="number" placeholder="球数" value={pitches}
            onChange={(e)=>setPitches(e.target.value)} style={input}/>

          {/* 状態 */}
          <div style={row}>
            {["○","△","×"].map(s=>(
              <button key={s} onClick={()=>setShoulder(s)} style={stateBtn(shoulder,s)}>{s}</button>
            ))}
          </div>

          <div style={row}>
            {["○","△","×"].map(s=>(
              <button key={s} onClick={()=>setElbow(s)} style={stateBtn(elbow,s)}>{s}</button>
            ))}
          </div>

          {/* 🔥 コメント */}
          <textarea
            placeholder="コメント（監督・選手どちらでも）"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            style={textarea}
          />

          <button onClick={saveData} style={saveBtn}>保存</button>
        </div>
      </div>
    </div>
  );
}

/* スタイル */

const bg={minHeight:"100vh",background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",padding:20};
const container={maxWidth:500,margin:"0 auto"};
const card={background:"white",padding:15,borderRadius:15};

const input={width:"100%",padding:10,marginBottom:10};
const textarea={width:"100%",padding:10,minHeight:80,marginBottom:10};

const row={display:"flex",gap:10,marginBottom:10};

const stateBtn=(current,val)=>({
  flex:1,
  padding:15,
  fontSize:18,
  borderRadius:12,
  color: val==="△"?"#333":"white",
  background:
    current===val
      ? val==="○"?"#3b82f6"
        : val==="△"?"#facc15"
        : "#ef4444"
      :"#ddd"
});

const saveBtn={width:"100%",padding:15,background:"#3b82f6",color:"white",borderRadius:15};
