"use client";
import { useEffect, useState } from "react";

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
      if(saved && saved.length>0){
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
    if(!pitches || !player) return;

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
        <h1>✏️ 入力</h1>

        <div style={row}>
          <input value={newPlayer}
            onChange={(e)=>setNewPlayer(e.target.value)}
            placeholder="選手追加"
            style={input}/>
          <button onClick={addPlayer}>追加</button>
        </div>

        <div>選手</div>
        <select value={player} onChange={(e)=>setPlayer(e.target.value)} style={input}>
          {players.map(p=><option key={p}>{p}</option>)}
        </select>

        <div>日付</div>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={input}/>

        <div>球数</div>
        <input type="number" value={pitches} onChange={(e)=>setPitches(e.target.value)} style={input}/>

        <div>投球種類</div>
        <select value={type} onChange={(e)=>setType(e.target.value)} style={input}>
          <option>ブルペン</option>
          <option>実戦練習</option>
          <option>試合</option>
        </select>

        <div>肩</div>
        <div style={row}>
          {["○","△","×"].map(s=>(
            <button key={s} onClick={()=>setShoulder(s)} style={stateBtn(shoulder,s)}>{s}</button>
          ))}
        </div>

        <div>肘</div>
        <div style={row}>
          {["○","△","×"].map(s=>(
            <button key={s} onClick={()=>setElbow(s)} style={stateBtn(elbow,s)}>{s}</button>
          ))}
        </div>

        <div>コメント</div>
        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} style={textarea}/>

        <button onClick={saveData} style={saveBtn}>保存</button>
      </div>
    </div>
  );
}

const bg={minHeight:"100vh",padding:20,background:"linear-gradient(135deg,#dbeafe,#f0fdf4)"};
const card={maxWidth:500,margin:"auto",background:"white",padding:20,borderRadius:20};
const input={width:"100%",height:40,marginBottom:10};
const textarea={width:"100%",height:80};
const row={display:"flex",gap:10};
const saveBtn={width:"100%",height:50,background:"#3b82f6",color:"white"};

const stateBtn=(c,v)=>({
  flex:1,
  height:50,
  fontSize:20,
  background:c===v?(v==="○"?"#3b82f6":v==="△"?"#facc15":"#ef4444"):"#ddd"
});
