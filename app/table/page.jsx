"use client";
import { useEffect, useState } from "react";

const playersList = ["熊", "坂田", "末永", "五島", "松尾"];

export default function TablePage() {
  const [data, setData] = useState([]);
  const [selectedPlayer, setSelectedPlayer] = useState(playersList[0]);

  useEffect(() => {
    const saved = localStorage.getItem("pitchData");
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  // 1週間の合計
  const getWeeklyTotal = () => {
    const now = new Date();
    const weekAgo = new Date();
    weekAgo.setDate(now.getDate() - 7);

    return data
      .filter((d) => d.player === selectedPlayer)
      .filter((d) => new Date(d.date) >= weekAgo)
      .reduce((sum, d) => sum + d.pitches, 0);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>一覧ページ</h1>

      {/* 選手選択 */}
      <div>
        <label>選手を選択：</label>
        <select
          value={selectedPlayer}
          onChange={(e) => setSelectedPlayer(e.target.value)}
        >
          {playersList.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <h2>{selectedPlayer}</h2>
      <div>1週間の球数：{getWeeklyTotal()} 球</div>

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
            .filter((d) => d.player === selectedPlayer)
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

      <br />
      <a href="/">ホームへ</a>
      <br />
      <a href="/input">入力ページへ</a>
    </div>
  );
}
