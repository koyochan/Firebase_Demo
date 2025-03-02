import "dotenv/config";
import type { ServiceAccount } from "firebase-admin";
import { initializeApp, cert, getApps } from "firebase-admin/app";

const activeApps = getApps();

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,  // ✅ 修正
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL, // ✅ 修正
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // ✅ 修正
};

const initApp = () => {
  console.info("Initializing Firebase Admin with service account.");
  return initializeApp({
    credential: cert(serviceAccount),
  });
};

export const app = activeApps.length === 0 ? initApp() : activeApps[0];