
// lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBIXa1i7ZMQmGprUEk_EKv2ptKjcxERWxQ",
  authDomain: "librena-3cc75.firebaseapp.com",
  projectId: "librena-3cc75",
  storageBucket: "librena-3cc75.firebasestorage.app",
  messagingSenderId: "654618924120",
  appId: "1:654618924120:web:e676e5e7027fa92566e62d",
  measurementId: "G-HLEWQJ7977"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };
