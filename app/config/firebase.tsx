// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyByIg_kMl3bh6P-IjkTq8473UxmFXmy-g8",
  authDomain: "uber-12f87.firebaseapp.com",
  projectId: "uber-12f87",
  storageBucket: "uber-12f87.firebasestorage.app",
  messagingSenderId: "57375379249",
  appId: "1:57375379249:web:901eff48aa179015902a10",
  measurementId: "G-TD616Y4XMN"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);



