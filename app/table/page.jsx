"use client";
import { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function TablePage() {
  const router = useRouter();
  const [data, setData] = useState([]);

  const loadData = async () => {
    const snapshot = await getDocs(collection(db, "pitchData"));
    const list = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    setData(list);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteData = async (id) => {
    await deleteDoc(doc(db, "pitchData", id));
    loadData();
  };

  const updateComment = async (id, value) => {
    await updateDoc(doc(db, "pitchData", id), {
      coachComment: value
    });
  };

  return (
    <div style={bg}>
      <div style={card}>
        <h2>結果ページ</h2>

        <button onClick={()=>router.push("/input")} style={navBtn}>
          ← 入力へ
        </button>

        {data.map(d => (
          <div key={d.id} style={item}>
            <div><b>{d.player}</b> ({d.date})</div>
            <div>球数: {d.pitches}</div>
            <div>肩: {d.shoulder} / 肘: {d.elbow}</div>
            <div>コメント: {d.comment}</div>

            <textarea
              defaultValue={d.coachComment}
              onBlur={(e)=>updateComment(d.id, e.target.value)}
              placeholder="指導者コメント"
              style={input}
            />

            <button onClick={()=>deleteData(d.id)} style={delBtn}>
              削除
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const bg={minHeight:"100vh",padding:20,background:"#efe"};
const card={background:"white",padding:20,borderRadius:10,maxWidth:600,margin:"auto"};
const item={borderBottom:"1px solid #ccc",padding:10};
const input={width:"100%",marginTop:5};
const delBtn={background:"red",color:"white",marginTop:5};
const navBtn={marginBottom:10};
