"use client";

export default function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>投手管理アプリ</h1>

      <a href="/input">
        <button style={{ marginTop: "10px" }}>入力する</button>
      </a>

      <br />

      <a href="/table">
        <button style={{ marginTop: "10px" }}>一覧を見る</button>
      </a>
    </div>
  );
}
