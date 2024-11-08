import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDs-Xzb1N79RPaFeAhLeE9ys6TXdMeLbfo",
  authDomain: "house-marketplace-app-218b1.firebaseapp.com",
  projectId: "house-marketplace-app-218b1",
  storageBucket: "house-marketplace-app-218b1.firebasestorage.app",
  messagingSenderId: "3221410304",
  appId: "1:3221410304:web:d71b996953a020a7ed7ee5"
};

// Initialize Firebase
initializeApp(firebaseConfig);
export const db = getFirestore();