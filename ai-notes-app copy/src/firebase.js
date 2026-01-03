// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBSuTw4QlpiyWBRCFFAXBiKRXx34h1VI9s",
  authDomain: "notes-3e596.firebaseapp.com",
  projectId: "notes-3e596",
  storageBucket: "notes-3e596.firebasestorage.app",
  messagingSenderId: "265417975370",
  appId: "1:265417975370:web:2169c61655a8441b59e8b3"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
