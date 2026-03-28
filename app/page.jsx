'use client';
import React, { useState } from "react";

export default function PitchManagerApp() {
  const [players, setPlayers] = useState([]);
  const [name, setName] = useState("");
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
     return (
    <div>
      <h1>ピッチ管理アプリ</h1>
      <p>動いた！</p>
    </div>
  );

  const addPlayer = () => {
    if (!name) return;
    setPlayers([
      ...players,
      { name, records: {} }
    ]);
    setName("");
  };

  const updateRecord = (index, field, value) => {
    const updated = [...players];
    const player = updated[index];

    if (!player.records[selectedDate]) {
      player.records[selectedDate] = {
        pitches: 0,
        shoulder: "OK",
        elbow: "OK"
      };
    }

    player.records[selectedDate][field] = value;
    setPlayers(updated);
  };

  const getRecord = (player) => {
    return (
      player.records[selectedDate] || {
        pitches: 0,
        shoulder: "OK",
        elbow: "OK"
      }
    );
  };

  const getWeeklyTotal = (player) => {
    const today = new Date(selectedDate);
    let total = 0;

    Object.entries(player.records).forEach(([date, record]) => {
      const d = new Date(date);
      const diff = (today - d) / (1000 * 60 * 60 * 24);
      if (diff >= 0 && diff < 7) {
        total += record.pitches;
      }
    });

    return total;
  };

  return (
    <div className="p-3 max-w-md mx-auto">
      <h1 className="text-xl font-bold mb-3 text-center">投手管理（練習）</h1>

      {/* 日付 */}
      <div className="mb-3">
        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </div>

      {/* 選手追加 */}
      <div className="flex gap-2 mb-3">
        <Input
          placeholder="選手名"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={addPlayer}>追加</Button>
      </div>

      {players.map((player, index) => {
        const record = getRecord(player);

        return (
          <Card key={index} className="mb-3 rounded-2xl shadow">
            <CardContent className="p-3 space-y-3">
              <div className="text-lg font-semibold">{player.name}</div>

              {/* 球数 */}
              <div>
                <div className="text-sm mb-1">球数</div>
                <Input
                  type="number"
                  className="text-xl text-center"
                  value={record.pitches}
                  onChange={(e) =>
                    updateRecord(index, "pitches", Number(e.target.value))
                  }
                />
              </div>

              {/* 週間合計 */}
              <div className="text-sm text-gray-600">
                直近7日間合計: {getWeeklyTotal(player)} 球
              </div>

              {/* 肩 */}
              <div>
                <div className="text-sm mb-1">肩の状態</div>
                <div className="flex gap-2">
                  {[{ label: "○", value: "OK" }, { label: "△", value: "違和感" }, { label: "×", value: "痛みあり" }].map((item) => (
                    <Button
                      key={item}
                      className={`flex-1 ${record.shoulder === item ? "bg-blue-500 text-white" : ""}`}
                      onClick={() => updateRecord(index, "shoulder", item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>

              {/* 肘 */}
              <div>
                <div className="text-sm mb-1">肘の状態</div>
                <div className="flex gap-2">
                  {[{ label: "○", value: "OK" }, { label: "△", value: "違和感" }, { label: "×", value: "痛みあり" }].map((item) => (
                    <Button
                      key={item}
                      className={`flex-1 ${record.elbow === item ? "bg-red-500 text-white" : ""}`}
                      onClick={() => updateRecord(index, "elbow", item)}
                    >
                      {item}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
