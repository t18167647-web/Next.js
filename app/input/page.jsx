"use client";
import { useState, useEffect } from "react";

const playersList = ["熊", "坂田", "末永", "五島", "松尾"];

export default function InputPage() {
  const [player, setPlayer] = useState(playersList[0]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [pitches, setPitches] = useState("");
  const [shoulder, setShoulder] = useState("○");
  const [elbow, setElbow] = useState("○");
  const [data, setData] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("pitchData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const saveData = () => {
    if (!pitches) return;

    const newData = [
      ...data,
      {
        player,
        date,
        pitches: Number(pitches),
        shoulder,
        elbow,
      },
    ];

    setData(newData);
    localStorage.setItem("pitchData", JSON.stringify(newData));

    setPitches("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>入力ページ</h1>

      <div>
        <label>選手：</label>
        <select value={player} onChange={(e) => setPlayer(e.target.value)}>
          {playersList.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <div>
        <label>日付：</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>

      <div>
        <label>球数：</label>
        <input
          type="number"
          value={pitches}
          onChange={(e) => setPitches(e.target.value)}
        />
      </div>

      <div>
        <label>肩：</label>
        <select value={shoulder} onChange={(e) => setShoulder(e.target.value)}>
          <option>○</option>
          <option>×</option>
        </select>
      </div>

      <div>
        <label>肘：</label>
        <select value={elbow} onChange={(e) => setElbow(e.target.value)}>
          <option>○</option>
          <option>×</option>
        </select>
      </div>

      <button onClick={saveData}>保存</button>

      <br /><br />
      <a href="/">ホームへ</a>
      <br />
      <a href="/table">表を見る</a>
    </div>
  );
}
