
import { initializeApp } from "firebase/app";
import { getAuth } from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBZmm2shH7q7ge6ypyD4NzNSx8hA2zhKOo",
  authDomain: "courtneygenix-fl.firebaseapp.com",
  projectId: "courtneygenix-fl",
  storageBucket: "courtneygenix-fl.appspot.com",
  messagingSenderId: "719235090770",
  appId: "1:719235090770:web:a40c7ef0b58c4dfd7e528b",
  measurementId: "G-QRHE7ZHNB3"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
