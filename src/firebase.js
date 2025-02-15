// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore,doc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCxGO27z9FvBmeCQcKOadGxY_HE-6D5BOw",
  authDomain: "spendora-9e2c3.firebaseapp.com",
  projectId: "spendora-9e2c3",
  storageBucket: "spendora-9e2c3.firebasestorage.app",
  messagingSenderId: "1087504264490",
  appId: "1:1087504264490:web:6c0099b0fdc8daba708253",
  measurementId: "G-P9PR8CCNJD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth= getAuth(app);
const provider = new GoogleAuthProvider();
export {db, auth, provider,doc,setDoc};