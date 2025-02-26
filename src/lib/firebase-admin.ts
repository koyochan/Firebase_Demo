import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config(); // .env ファイルを読み込む

const isProduction = process.env.PUBLIC_IS_PRODUCTION;
console.log(`🚀 Running in ${isProduction ? "Production" : "Development"} Mode`);

// Firebase Admin SDK が未初期化なら実行
if (!admin.apps.length) {
  if (isProduction) {

    // Service Account を .env から直接取得
    const serviceAccount = {
      type: process.env.FIREBASE_TYPE,
      project_id: process.env.FIREBASE_PROJECT_ID,
      private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"), // 改行を適切に処理
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      client_id: process.env.FIREBASE_CLIENT_ID,
      auth_uri: process.env.FIREBASE_AUTH_URI,
      token_uri: process.env.FIREBASE_TOKEN_URI,
      auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
      client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
    };

    // 必須の環境変数が欠けていないかチェック
    if (!serviceAccount.private_key || !serviceAccount.client_email) {
      console.error("❌ Missing Firebase service account credentials in environment variables.");
      process.exit(1);
    }

    // Firebase Admin SDK を初期化
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });

    console.log("✅ Firebase Admin SDK initialized successfully in **Production** mode!");
  } else {
    console.log("⚠ Running in Test Mode (Emulator)");

    // エミュレータ環境変数が設定されているか確認
    if (!process.env.PUBLIC_FIRESTORE_EMULATOR_HOST || !process.env.PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
      console.error("❌ FIRESTORE_EMULATOR_HOST or FIREBASE_AUTH_EMULATOR_HOST is not set.");
      process.exit(1);
    }

    // Firebase エミュレータ用の初期化
    admin.initializeApp({ projectId: process.env.FIREBASE_PROJECT_ID });

    console.log("✅ Firebase Admin SDK initialized successfully in **Emulator** mode!");
  }
}

// Firestore & Auth のインスタンスを取得
const db = admin.firestore();
const auth = admin.auth();

console.log("🔥 Firestore & Auth services are ready to use!");

export { db, auth, isProduction };