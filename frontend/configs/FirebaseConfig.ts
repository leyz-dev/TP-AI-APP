// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8u0S6tPLRUnvv9RP-EjTnIvL_fUZ_hH4",
  authDomain: "pack-c61b2.firebaseapp.com",
  projectId: "pack-c61b2",
  storageBucket: "pack-c61b2.firebasestorage.app",
  messagingSenderId: "63948905641",
  appId: "1:63948905641:web:32a63878ed1222db6addb8",
  measurementId: "G-06T0THGM4V",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export { app, analytics, auth };
