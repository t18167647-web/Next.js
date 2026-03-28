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

  // 選手ごとに分ける
  const players = [...new Set(data.map((d) => d.player))];

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

      {players.map((player) => (
        <div key={player} style={{ marginBottom: 40 }}>
          <h2>{player}</h2>
          <div>1週間の球数：{getWeeklyTotal(player)} 球</div>

          <table border="1">
            <thead>
              <tr>
                <th>日付</th>
                <th>球数</th>
                <th>肩</th>
                <th>肘</th>
              </tr>
            </thead>
            <tbody>
              {data
                .filter((d) => d.player === player)
                .map((d, i) => (
                  <tr key={i}>
                    <td>{d.date}</td>
                    <td>{d.pitches}</td>
                    <td>{d.shoulder}</td>
                    <td>{d.elbow}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ))}

      <br />
      <a href="/">ホームへ</a>
      <br />
      <a href="/input">入力ページへ</a>
    </div>
  );
}
