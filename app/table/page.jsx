"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import {
collection,
addDoc,
getDocs,
deleteDoc,
doc,
updateDoc
} from "firebase/firestore";

export default function TablePage() {
const [data, setData] = useState([]);
const [coachComments, setCoachComments] = useState({});

// 🔽 データ取得
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

// 🔽 削除
const deleteData = async (id) => {
await deleteDoc(doc(db, "pitchData", id));
fetchData();
};

// 🔽 コメント変更
const handleCommentChange = (id, value) => {
setCoachComments({
...coachComments,
[id]: value
});
};

// 🔽 コメント保存
const saveComment = async (id) => {
const comment = coachComments[id] || "";
await updateDoc(doc(db, "pitchData", id), {
coachComment: comment
});
alert("コメント保存！");
fetchData();
};

return ( <div style={bg}> <div style={container}>

```
    {/* 上に固定ボタン */}
    <div style={topBar}>
      <button onClick={() => location.href = "/input"} style={navBtn}>
        ← 入力へ
      </button>
    </div>

    <h1 style={title}>📊 結果</h1>

    {data.length === 0 && <p>データなし</p>}

    {data.map((d) => (
      <div key={d.id} style={card}>

        <div style={row}>
          <b>{d.player}</b>
          <span>{d.date}</span>
        </div>

        <div>球数：{d.pitches}</div>
        <div>種類：{d.type}</div>

        {/* 👇 わかりやすく表示 */}
        <div>肩：{d.shoulder}</div>
        <div>肘：{d.elbow}</div>

        <div>コメント：{d.comment}</div>

        {/* 👇 指導者コメント */}
        <div style={label}>指導者コメント</div>
        <textarea
          value={coachComments[d.id] ?? d.coachComment ?? ""}
          onChange={(e) =>
            handleCommentChange(d.id, e.target.value)
          }
          style={textarea}
        />

        <div style={btnRow}>
          <button onClick={() => saveComment(d.id)} style={saveBtn}>
            保存
          </button>
          <button onClick={() => deleteData(d.id)} style={deleteBtn}>
            削除
          </button>
        </div>

      </div>
    ))}
  </div>
</div>
```

);
}

/* ===== スタイル ===== */
const bg = {
minHeight: "100vh",
background: "linear-gradient(135deg,#dbeafe,#f0fdf4)",
padding: 20
};

const container = {
maxWidth: 600,
margin: "0 auto"
};

const title = {
textAlign: "center",
marginBottom: 20
};

const card = {
background: "white",
padding: 15,
borderRadius: 15,
marginBottom: 15,
boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
};

const row = {
display: "flex",
justifyContent: "space-between",
marginBottom: 5
};

const label = {
marginTop: 10,
fontWeight: "bold"
};

const textarea = {
width: "100%",
minHeight: 60,
marginTop: 5
};

const btnRow = {
display: "flex",
gap: 10,
marginTop: 10
};

const saveBtn = {
flex: 1,
background: "#3b82f6",
color: "white",
height: 40
};

const deleteBtn = {
flex: 1,
background: "#ef4444",
color: "white",
height: 40
};

const topBar = {
marginBottom: 10
};

const navBtn = {
background: "#333",
color: "white",
padding: "8px 12px"
};
