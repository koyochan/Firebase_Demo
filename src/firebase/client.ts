import { initializeApp } from "firebase/app";


const firebaseConfig = {
  apiKey: import.meta.env.PUBLIC_FIREBASE_API_KEY,
  authDomain: import.meta.env.PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.PUBLIC_FIREBASE_APP_ID,
};


try {
  // Firebase が既に初期化されていないか確認
  console.log("🔥 Firebase has been initialized successfully!");
} catch (error) {
  console.error("❌ Firebase initialization error:", error);
}

export const app = initializeApp(firebaseConfig);