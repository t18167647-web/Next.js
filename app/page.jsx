"use client";
import Link from "next/link";

export default function Home() {
  return (
    <div style={bg}>
      <div style={card}>
        <h1 style={title}>⚾ 投手管理アプリ</h1>

        <Link href="/input">
          <button style={btn}>✏️ 入力ページ</button>
        </Link>

        <Link href="/table">
          <button style={btn}>📊 結果を見る</button>
        </Link>
      </div>
    </div>
  );
}

const bg={minHeight:"100vh",display:"flex",justifyContent:"center",alignItems:"center",
background:"linear-gradient(135deg,#bfdbfe,#dcfce7)"};

const card={background:"white",padding:40,borderRadius:20,textAlign:"center"};

const title={marginBottom:30};

const btn={width:200,height:60,fontSize:18,margin:10,
background:"#3b82f6",color:"white",border:"none",borderRadius:10};
