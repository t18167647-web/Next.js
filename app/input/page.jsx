"use client";

import { useState } from "react";
import { db } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function InputPage() {
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleSubmit = async () => {
    if (!name || !score) return;

    try {
      await addDoc(collection(db, "pitch_data"), {
        name: name,
        score: Number(score),
        createdAt: new Date()
      });

      alert("保存できた！");
      setName("");
      setScore("");
    } catch (e) {
      console.error(e);
      alert("エラー");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>データ入力</h1>

      <input
        placeholder="名前"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="スコア"
        value={score}
        onChange={(e) => setScore(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>保存</button>
    </div>
  );
}
