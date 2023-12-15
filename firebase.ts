import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API,
  authDomain: "chat-gpt-clone-a7065.firebaseapp.com",
  projectId: "chat-gpt-clone-a7065",
  storageBucket: "chat-gpt-clone-a7065.appspot.com",
  messagingSenderId: "1078797477658",
  appId: "1:1078797477658:web:762602ff2789d8a3ae6ea3",
};

// Singleton pattern
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
