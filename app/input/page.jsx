"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function InputPage() {
  const defaultPlayers=["熊","坂田","末永","五島","松尾"];

  const [players,setPlayers]=useState([]);
  const [player,setPlayer]=useState("");
  const [newPlayer,setNewPlayer]=useState("");

  const [date,setDate]=useState(new Date().toISOString().split("T")[0]);
  const [pitches,setPitches]=useState("");
  const [shoulder,setShoulder]=useState("○");
  const [elbow,setElbow]=useState("○");
  const [comment,setComment]=useState("");
  const [type,setType]=useState("ブルペン");

  useEffect(()=>{
    try{
      const saved=JSON.parse(localStorage.getItem("players"));
      if(saved && saved.length){
        setPlayers(saved);
        setPlayer(saved[0]);
      }else{
        setPlayers(defaultPlayers);
        setPlayer(defaultPlayers[0]);
        localStorage.setItem("players",JSON.stringify(defaultPlayers));
      }
    }catch{
      setPlayers(defaultPlayers);
      setPlayer(defaultPlayers[0]);
    }
  },[]);

  const addPlayer=()=>{
    if(!newPlayer) return;
    const updated=[...players,newPlayer];
    setPlayers(updated);
    setPlayer(newPlayer);
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
      comment,
      type
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
      <div style={card}>

        {/* ナビ */}
        <div style={nav}>
          <Link href="/"><button style={navBtn}>🏠 ホーム</button></Link>
          <Link href="/table"><button style={navBtn}>📊 結果</button></Link>
        </div>

        <h1 style={title}>✏️ 入力</h1>

        {/* 選手追加 */}
        <div style={row}>
          <input value={newPlayer}
            onChange={(e)=>setNewPlayer(e.target.value)}
            placeholder="選手追加"
            style={input}/>
          <button onClick={addPlayer} style={addBtn}>追加</button>
        </div>

        {/* 選手 */}
        <div style={label}>選手</div>
        <select value={player} onChange={(e)=>setPlayer(e.target.value)} style={input}>
          {players.map(p=><option key={p}>{p}</option>)}
        </select>

        {/* 日付 */}
        <div style={label}>日付</div>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={input}/>

        {/* 球数 */}
        <div style={label}>球数</div>
        <input type="number" value={pitches} onChange={(e)=>setPitches(e.target.value)} style={input}/>

        {/* 種類 */}
        <div style={label}>投球種類</div>
        <select value={type} onChange={(e)=>setType(e.target.value)} style={input}>
          <option>ブルペン</option>
          <option>実戦練習</option>
          <option>試合</option>
        </select>

        {/* 🔥 肩 */}
        <div style={label}>肩の状態</div>
        <div style={row}>
          {["○","△","×"].map(s=>(
            <button key={s} onClick={()=>setShoulder(s)} style={stateBtn(shoulder,s)}>
              {s}
            </button>
          ))}
        </div>

        {/* 🔥 肘 */}
        <div style={label}>肘の状態</div>
        <div style={row}>
          {["○","△","×"].map(s=>(
            <button key={s} onClick={()=>setElbow(s)} style={stateBtn(elbow,s)}>
              {s}
            </button>
          ))}
        </div>

        {/* コメント */}
        <div style={label}>コメント</div>
        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} style={textarea}/>

        <button onClick={saveData} style={saveBtn}>保存する</button>

      </div>
    </div>
  );
}

/* UI */

const bg={
  minHeight:"100vh",
  background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",
  padding:20
};

const card={
  maxWidth:500,
  margin:"auto",
  background:"white",
  padding:20,
  borderRadius:20,
  boxShadow:"0 10px 20px rgba(0,0,0,0.1)"
};

const title={textAlign:"center",marginBottom:10};

const nav={display:"flex",justifyContent:"space-between",marginBottom:10};

const navBtn={padding:"8px 12px"};

const label={fontWeight:"bold",marginTop:10};

const input={width:"100%",height:45,marginBottom:10,borderRadius:10,padding:10};

const textarea={width:"100%",height:80,borderRadius:10,padding:10};

const row={display:"flex",gap:10};

const addBtn={width:80};

const saveBtn={
  width:"100%",
  height:50,
  marginTop:10,
  background:"#3b82f6",
  color:"white",
  borderRadius:10
};

const stateBtn=(c,v)=>({
  flex:1,
  height:60,
  fontSize:22,
  borderRadius:10,
  color:"white",
  background:
    c===v
      ? v==="○"
        ? "#3b82f6"
        : v==="△"
        ? "#facc15"
        : "#ef4444"
      : "#ddd"
});
