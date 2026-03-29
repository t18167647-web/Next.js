import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
apiKey: "ここに自分のapiKey",
authDomain: "ここにauthDomain",
projectId: "ここにprojectId",
storageBucket: "ここにstorageBucket",
messagingSenderId: "ここにsenderId",
appId: "ここにappId"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
