"use client";
import { useEffect, useState } from "react";

export default function TablePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("pitchData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  // 1週間の合計
  const getWeeklyTotal = (player) => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return data
      .filter((d) => d.player === player)
      .filter((d) => new Date(d.date) >= weekAgo)
      .reduce((sum, d) => sum + d.pitches, 0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>一覧ページ</h1>

      <table border="1">
        <thead>
          <tr>
            <th>選手</th>
            <th>日付</th>
            <th>球数</th>
            <th>肩</th>
            <th>肘</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.player}</td>
              <td>{d.date}</td>
              <td>{d.pitches}</td>
              <td>{d.shoulder}</td>
              <td>{d.elbow}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>1週間の球数</h2>
      {[...new Set(data.map((d) => d.player))].map((p) => (
        <div key={p}>
          {p}: {getWeeklyTotal(p)} 球
        </div>
      ))}

      <br />
      <a href="/">ホームへ</a>
      <br />
      <a href="/input">入力ページへ</a>
    </div>
  );
}
