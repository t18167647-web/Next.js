"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
collection,
getDocs,
deleteDoc,
doc,
updateDoc
} from "firebase/firestore";

export default function TablePage() {
const [data, setData] = useState([]);
const [coachComments, setCoachComments] = useState({});

const fetchData = async () => {
const snapshot = await getDocs(collection(db, "pitchData"));
const list = snapshot.docs.map(doc => ({
id: doc.id,
...doc.data()
}));
setData(list);
};

useEffect(() => {
fetchData();
}, []);

const deleteData = async (id) => {
await deleteDoc(doc(db, "pitchData", id));
fetchData();
};

const handleCommentChange = (id, value) => {
setCoachComments({
...coachComments,
[id]: value
});
};

const saveComment = async (id) => {
await updateDoc(doc(db, "pitchData", id), {
coachComment: coachComments[id] || ""
});
alert("保存！");
fetchData();
};

return ( <div style={bg}> <div style={container}>

```
    <div style={topBar}>
      <button onClick={() => location.href = "/input"} style={navBtn}>
        ← 入力へ
      </button>
    </div>

    <h1 style={title}>📊 結果</h1>

    {data.map((d) => (
      <div key={d.id} style={card}>

        <b>{d.player}</b>
        <div>{d.date}</div>
        <div>球数：{d.pitches}</div>
        <div>種類：{d.type}</div>
        <div>肩：{d.shoulder}</div>
        <div>肘：{d.elbow}</div>
        <div>コメント：{d.comment}</div>

        <div>指導者コメント</div>
        <textarea
          value={coachComments[d.id] ?? d.coachComment ?? ""}
          onChange={(e)=>handleCommentChange(d.id,e.target.value)}
          style={textarea}
        />

        <div style={row}>
          <button onClick={()=>saveComment(d.id)} style={saveBtn}>保存</button>
          <button onClick={()=>deleteData(d.id)} style={deleteBtn}>削除</button>
        </div>

      </div>
    ))}
  </div>
</div>
```

);
}

/* style */
const bg={minHeight:"100vh",background:"#efe",padding:20};
const container={maxWidth:600,margin:"0 auto"};
const title={textAlign:"center"};
const card={background:"white",padding:15,borderRadius:15,marginBottom:10};
const textarea={width:"100%",minHeight:60};
const row={display:"flex",gap:10,marginTop:10};
const saveBtn={flex:1,background:"#3b82f6",color:"white"};
const deleteBtn={flex:1,background:"#ef4444",color:"white"};
const topBar={marginBottom:10};
const navBtn={background:"#333",color:"white",padding:"8px 12px"};
