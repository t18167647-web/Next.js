"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20, maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ marginBottom: 30 }}>投手管理</h1>

      <Link href="/input">
        <button style={{
          width: "100%",
          padding: 20,
          fontSize: 20,
          marginBottom: 15,
          borderRadius: 15,
          background: "#0070f3",
          color: "white",
        }}>
          入力する
        </button>
      </Link>

      <Link href="/table">
        <button style={{
          width: "100%",
          padding: 20,
          fontSize: 20,
          borderRadius: 15,
          background: "#eee",
        }}>
          結果を見る
        </button>
      </Link>
    </div>
  );
}
