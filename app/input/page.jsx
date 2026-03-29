"use client";
import { useState } from "react";
import { db } from "../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function InputPage() {
const [player, setPlayer] = useState("");
const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
const [pitches, setPitches] = useState("");
const [shoulder, setShoulder] = useState("○");
const [elbow, setElbow] = useState("○");
const [comment, setComment] = useState("");
const [type, setType] = useState("ブルペン");

const saveData = async () => {
if (!player || !pitches) {
alert("入力して！");
return;
}

```
await addDoc(collection(db, "pitchData"), {
  player,
  date,
  pitches: Number(pitches),
  shoulder,
  elbow,
  comment,
  type,
  coachComment: ""
});

setPitches("");
setComment("");
alert("保存した！");
```

};

return ( <div style={bg}> <div style={container}>

```
    <div style={topBar}>
      <button onClick={() => location.href = "/table"} style={navBtn}>
        → 結果へ
      </button>
    </div>

    <h1 style={title}>✏️ 入力</h1>

    <div style={card}>

      <input placeholder="選手名" value={player}
        onChange={(e) => setPlayer(e.target.value)} style={input}/>

      <input type="date" value={date}
        onChange={(e) => setDate(e.target.value)} style={input}/>

      <input type="number" placeholder="球数"
        value={pitches}
        onChange={(e) => setPitches(e.target.value)} style={input}/>

      <select value={type}
        onChange={(e) => setType(e.target.value)} style={input}>
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

      <textarea placeholder="コメント"
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
        style={textarea}/>

      <button onClick={saveData} style={saveBtn}>保存</button>

    </div>
  </div>
</div>
```

);
}

/* style */
const bg={minHeight:"100vh",background:"#eef",padding:20};
const container={maxWidth:500,margin:"0 auto"};
const title={textAlign:"center"};
const card={background:"white",padding:20,borderRadius:15};
const input={width:"100%",height:40,marginBottom:10};
const textarea={width:"100%",minHeight:60,marginBottom:10};
const row={display:"flex",gap:10};
const stateBtn=(c,v)=>({flex:1,height:40,background:c===v?"#3b82f6":"#ddd"});
const saveBtn={width:"100%",height:50,background:"#3b82f6",color:"white"};
const topBar={marginBottom:10};
const navBtn={background:"#333",color:"white",padding:"8px 12px"};
