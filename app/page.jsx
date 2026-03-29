import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>トップ</h1>

      <a href="/input">入力ページへ</a>
      <br />
      <a href="/table">一覧ページへ</a>
    </div>
  );
}



