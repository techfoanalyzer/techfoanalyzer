'use client'
import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "techfoanalyzer.firebaseapp.com",
  projectId: "techfoanalyzer",
  storageBucket: "techfoanalyzer.firebasestorage.app",
  messagingSenderId: "417596928438",
  appId: "1:417596928438:web:8bceedf66b450e82121117"
};


const app = initializeApp(firebaseConfig);


const Auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {Auth,provider}