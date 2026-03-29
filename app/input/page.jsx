"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function InputPage() {
  const router = useRouter();

  const defaultPlayers = ["熊","坂田","末永","五島","松尾"];

  const [players, setPlayers] = useState(defaultPlayers);
  const [player, setPlayer] = useState(defaultPlayers[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [pitches, setPitches] = useState("");
  const [shoulder, setShoulder] = useState("○");
  const [elbow, setElbow] = useState("○");
  const [comment, setComment] = useState("");

  const saveData = async () => {
    if (!pitches) return;

    await addDoc(collection(db, "pitchData"), {
      player,
      date,
      pitches: Number(pitches),
      shoulder,
      elbow,
      comment,
      coachComment: ""
    });

    setPitches("");
    setComment("");
    alert("保存しました");
  };

  return (
    <div style={bg}>
      <div style={card}>
        <h2>入力ページ</h2>

        <button onClick={() => router.push("/table")} style={navBtn}>
          結果へ →
        </button>

        <div>選手</div>
        <select value={player} onChange={(e)=>setPlayer(e.target.value)} style={input}>
          {players.map(p => <option key={p}>{p}</option>)}
        </select>

        <div>日付</div>
        <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} style={input}/>

        <div>球数</div>
        <input type="number" value={pitches} onChange={(e)=>setPitches(e.target.value)} style={input}/>

        <div>肩</div>
        <div style={row}>
          {["○","△","×"].map(s => (
            <button key={s} onClick={()=>setShoulder(s)} style={btn(shoulder,s)}>{s}</button>
          ))}
        </div>

        <div>肘</div>
        <div style={row}>
          {["○","△","×"].map(s => (
            <button key={s} onClick={()=>setElbow(s)} style={btn(elbow,s)}>{s}</button>
          ))}
        </div>

        <div>コメント</div>
        <textarea value={comment} onChange={(e)=>setComment(e.target.value)} style={input}/>

        <button onClick={saveData} style={saveBtn}>保存</button>
      </div>
    </div>
  );
}

const bg={minHeight:"100vh",padding:20,background:"#eef"};
const card={background:"white",padding:20,borderRadius:10,maxWidth:500,margin:"auto"};
const input={width:"100%",marginBottom:10,height:40};
const row={display:"flex",gap:10};
const btn=(c,v)=>({flex:1,height:40,background:c===v?"#4ade80":"#ddd"});
const saveBtn={width:"100%",height:50,background:"#3b82f6",color:"white"};
const navBtn={marginBottom:10};
