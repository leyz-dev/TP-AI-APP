// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
import { getAuth } from "firebase/auth";
