// src/lib/firebase.ts
import { getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const cfg = {
  apiKey: process.env.EXPO_PUBLIC_FB_API_KEY!,
  authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN!,
  projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID!,
  storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET!,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MSG_SENDER_ID!,
  appId: process.env.EXPO_PUBLIC_FB_APP_ID!,
  measurementId: process.env.EXPO_PUBLIC_FB_MEASUREMENT_ID,
};

if (!cfg.apiKey || !cfg.projectId) {
  throw new Error(
    "Firebase config is missing. Make sure your .env file has the EXPO_PUBLIC_FB_* variables and you restarted Expo. (Tip: run `npx expo config --type public` to verify)"
  );
}

export const app = getApps().length ? getApps()[0] : initializeApp(cfg);
export const auth = getAuth(app);
export const db = getFirestore(app);
