"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #dbeafe, #f0fdf4)",
      padding: 20
    }}>
      <div style={{
        maxWidth: 500,
        margin: "0 auto",
        textAlign: "center"
      }}>
        <h1 style={{ fontSize: 28, marginBottom: 10 }}>
          ⚾ 投手管理
        </h1>

        <p style={{ color: "#555", marginBottom: 30 }}>
          毎日のコンディションをチェック
        </p>

        <Link href="/input">
          <button style={{
            width: "100%",
            padding: 18,
            fontSize: 18,
            marginBottom: 15,
            borderRadius: 20,
            background: "#3b82f6",
            color: "white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            ✏️ 入力する
          </button>
        </Link>

        <Link href="/table">
          <button style={{
            width: "100%",
            padding: 18,
            fontSize: 18,
            borderRadius: 20,
            background: "#22c55e",
            color: "white",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
          }}>
            📊 結果を見る
          </button>
        </Link>
      </div>
    </div>
  );
}
