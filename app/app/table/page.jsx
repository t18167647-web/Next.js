"use client";
import { useEffect, useState } from "react";

export default function TablePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("players") || "[]");
    setData(saved);
  }, []);

  // 1週間の合計
  const getWeeklyTotal = (name) => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return data
      .filter(
        (d) =>
          d.name === name &&
          new Date(d.date) >= weekAgo &&
          new Date(d.date) <= now
      )
      .reduce((sum, d) => sum + d.count, 0);
  };

  const players = [...new Set(data.map((d) => d.name))];

  return (
    <div style={{ padding: "20px" }}>
      <h1>一覧ページ</h1>

      <h2>1週間の球数</h2>
      {players.map((p) => (
        <div key={p}>
          {p}：{getWeeklyTotal(p)}球
        </div>
      ))}

      <h2 style={{ marginTop: "20px" }}>データ一覧</h2>

      <table border="1" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>名前</th>
            <th>日付</th>
            <th>球数</th>
            <th>肩</th>
            <th>肘</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d, i) => (
            <tr key={i}>
              <td>{d.name}</td>
              <td>{d.date}</td>
              <td>{d.count}</td>
              <td>{d.shoulder}</td>
              <td>{d.elbow}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
