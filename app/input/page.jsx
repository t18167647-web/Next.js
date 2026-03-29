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
  const [role,setRole]=useState("選手");

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
      comment,
      role
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
          <div style={row}>
            <input
              value={newPlayer}
              onChange={(e)=>setNewPlayer(e.target.value)}
              placeholder="選手追加"
              style={input}
            />
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
          <input type="number"
            placeholder="球数"
            value={pitches}
            onChange={(e)=>setPitches(e.target.value)}
            style={input}
          />

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

          {/* コメント種類 */}
          <div style={label}>コメント種別</div>
          <select value={role} onChange={(e)=>setRole(e.target.value)} style={input}>
            <option>選手</option>
            <option>監督</option>
          </select>

          {/* コメント */}
          <div style={label}>コメント</div>
          <textarea
            placeholder="コメント"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
            style={textarea}
          />

          <button onClick={saveData} style={saveBtn}>保存</button>
        </div>

        {/* ナビ */}
        <div style={{display:"flex",gap:10,marginTop:20}}>
          <a href="/"><button style={navBtn("#222")}>🏠 ホーム</button></a>
          <a href="/input"><button style={navBtn("#3b82f6")}>✏️ 入力</button></a>
          <a href="/table"><button style={navBtn("#22c55e")}>📊 結果</button></a>
        </div>

      </div>
    </div>
  );
}

/* スタイル */

const bg={
  minHeight:"100vh",
  background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",
  padding:20
};

const container={
  maxWidth:500,
  margin:"0 auto"
};

const card={
  background:"white",
  padding:20,
  borderRadius:20,
  boxShadow:"0 4px 10px rgba(0,0,0,0.05)"
};

const label={
  fontWeight:"bold",
  marginTop:10,
  marginBottom:5
};

const input={
  width:"100%",
  height:45,
  padding:"0 10px",
  marginBottom:10,
  borderRadius:10,
  fontSize:16
};

const textarea={
  width:"100%",
  minHeight:80,
  padding:10,
  borderRadius:10,
  marginBottom:10
};

const row={
  display:"flex",
  gap:10,
  marginBottom:10
};

const stateBtn=(current,val)=>({
  flex:1,
  height:50,
  fontSize:20,
  fontWeight:"bold",
  borderRadius:12,
  color: val==="△"?"#333":"white",
  background:
    current===val
      ? val==="○"?"#3b82f6"
        : val==="△"?"#facc15"
        : "#ef4444"
      :"#ddd"
});

const addBtn={
  width:80,
  height:45,
  borderRadius:10,
  background:"#22c55e",
  color:"white"
};

const saveBtn={
  width:"100%",
  height:50,
  marginTop:10,
  borderRadius:15,
  background:"#3b82f6",
  color:"white",
  fontSize:18
};

const navBtn=(bg)=>({
  flex:1,
  height:45,
  borderRadius:12,
  background:bg,
  color:"white"
});
