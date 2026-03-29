"use client";
import { useEffect, useState } from "react";

export default function InputPage() {
  const defaultPlayers = ["熊","坂田","末永","五島","松尾"];

  const [players,setPlayers]=useState([]);
  const [newPlayer,setNewPlayer]=useState("");

  const [player,setPlayer]=useState("");
  const [date,setDate]=useState(new Date().toISOString().split("T")[0]);
  const [pitches,setPitches]=useState("");
  const [shoulder,setShoulder]=useState("○");
  const [elbow,setElbow]=useState("○");
  const [comment,setComment]=useState("");
  const [type,setType]=useState("ブルペン");

  // ⭐ 安全読み込み（エラー防止）
  useEffect(()=>{
    let saved=[];
    try{
      saved = JSON.parse(localStorage.getItem("players")) || [];
    }catch{
      saved = [];
    }

    if(saved.length){
      setPlayers(saved);
      setPlayer(saved[0]);
    }else{
      setPlayers(defaultPlayers);
      setPlayer(defaultPlayers[0]);
      localStorage.setItem("players",JSON.stringify(defaultPlayers));
    }
  },[]);

  // ⭐ 選手追加
  const addPlayer=()=>{
    if(!newPlayer) return;
    const updated=[...players,newPlayer];
    setPlayers(updated);
    localStorage.setItem("players",JSON.stringify(updated));
    setNewPlayer("");
  };

  // ⭐ 保存（安全版）
  const saveData=()=>{
    if(!pitches) return;

    const newData={
      player,
      date,
      pitches:Number(pitches),
      shoulder,
      elbow,
      comment,
      role:"選手",
      type
    };

    let saved=[];
    try{
      saved = JSON.parse(localStorage.getItem("pitchData")) || [];
    }catch{
      saved = [];
    }

    saved.push(newData);
    localStorage.setItem("pitchData",JSON.stringify(saved));

    setPitches("");
    setComment("");
    alert("保存しました");
  };

  return (
    <div style={bg}>
      <div style={container}>
        <h1 style={{textAlign:"center"}}>✏️ 入力ページ</h1>

        <div style={card}>

          {/* 選手追加 */}
          <div style={row}>
            <input
              value={newPlayer}
              onChange={(e)=>setNewPlayer(e.target.value)}
              placeholder="選手を追加"
              style={input}
            />
            <button onClick={addPlayer} style={addBtn}>追加</button>
          </div>

          {/* 選手選択 */}
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

          {/* 投球タイプ */}
          <div style={label}>投球種類</div>
          <select value={type} onChange={(e)=>setType(e.target.value)} style={input}>
            <option>ブルペン</option>
            <option>実戦練習</option>
            <option>試合</option>
          </select>

          {/* 肩 */}
          <div style={label}>肩の状態</div>
          <div style={row}>
            {["○","△","×"].map(s=>(
              <button key={s} onClick={()=>setShoulder(s)} style={stateBtn(shoulder,s)}>
                {s}
              </button>
            ))}
          </div>

          {/* 肘 */}
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

          {/* 保存 */}
          <button onClick={saveData} style={saveBtn}>保存する</button>

        </div>
      </div>
    </div>
  );
}

/* ===== デザイン ===== */
const bg={
  minHeight:"100vh",
  background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",
  padding:20
};

const container={maxWidth:500,margin:"0 auto"};

const card={
  background:"white",
  padding:20,
  borderRadius:20,
  boxShadow:"0 10px 20px rgba(0,0,0,0.1)"
};

const label={fontWeight:"bold",marginTop:10};

const input={
  width:"100%",
  height:45,
  marginBottom:10,
  borderRadius:10,
  border:"1px solid #ccc",
  padding:"0 10px"
};

const textarea={
  width:"100%",
  minHeight:80,
  marginBottom:10,
  borderRadius:10,
  border:"1px solid #ccc",
  padding:10
};

const row={display:"flex",gap:10};

const stateBtn=(c,v)=>({
  flex:1,
  height:50,
  borderRadius:10,
  fontSize:18,
  border:"none",
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

const addBtn={
  width:80,
  borderRadius:10
};

const saveBtn={
  width:"100%",
  height:50,
  background:"#3b82f6",
  color:"white",
  border:"none",
  borderRadius:10,
  fontSize:16
};
