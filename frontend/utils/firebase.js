
// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider
} from "firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "cortexai-63128.firebaseapp.com",
  projectId: "cortexai-63128",
  storageBucket: "cortexai-63128.firebasestorage.app",
  messagingSenderId: "441030389403",
  appId: "1:441030389403:web:30c188014daf8408a7e03e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Authentication
export const auth = getAuth(app);

// Google Authentication Provider
export const googleProvider = new GoogleAuthProvider();
