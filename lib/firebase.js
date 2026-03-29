import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfiOFGmwrDfhRHottkh-7W_mpmwaMPED0",
  authDomain: "pither-kenkou.firebaseapp.com",
  projectId: "pither-kenkou",
  storageBucket: "pither-kenkou.firebasestorage.app",
  messagingSenderId: "850714014941",
  appId: "1:850714014941:web:e2eb44f93a8dd2f5399734"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
