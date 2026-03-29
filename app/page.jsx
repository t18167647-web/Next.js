"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      minHeight:"100vh",
      background:"linear-gradient(135deg,#dbeafe,#f0fdf4)",
      padding:20
    }}>
      <div style={{maxWidth:500,margin:"0 auto",textAlign:"center"}}>
        <h1 style={{fontSize:28}}>⚾ 投手管理</h1>

        <Link href="/input">
          <button style={btn("#3b82f6")}>✏️ 入力</button>
        </Link>

        <Link href="/table">
          <button style={btn("#22c55e")}>📊 結果</button>
        </Link>
      </div>
    </div>
  );
}

const btn=(bg)=>({
  width:"100%",
  padding:18,
  marginBottom:15,
  borderRadius:20,
  background:bg,
  color:"white"
});
