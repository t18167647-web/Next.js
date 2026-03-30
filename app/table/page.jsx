"use client";

import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, getDocs } from "firebase/firestore";

export default function TablePage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "pitch_data"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(list);
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>一覧</h1>

      {data.map((item) => (
        <div key={item.id}>
          {item.name} : {item.score}
        </div>
      ))}
    </div>
  );
}
