/// <reference types="astro/client" />

interface ImportMetaEnv {

  // 本番環境とテスト環境の切り替え
  readonly PUBLIC_IS_PRODUCTION: boolean;

  // サービスアカウントキー
  readonly FIREBASE_TYPE: string,
  readonly FIREBASE_PROJECT_ID: string,
  readonly FIREBASE_PRIVATE_KEY_ID: string,
  readonly FIREBASE_PRIVATE_KEY: string, // 改行を適切に処理
  readonly FIREBASE_CLIENT_EMAIL: string,
  readonly FIREBASE_CLIENT_ID: string,
  readonly FIREBASE_AUTH_URI: string,
  readonly FIREBASE_TOKEN_URI: string,
  readonly FIREBASE_AUTH_PROVIDER_X509_CERT_URL: string,
  readonly FIREBASE_CLIENT_X509_CERT_URL: string,

  // クライアントサイド用 (環境変数をクライアントで使う場合は `PUBLIC_` を付ける)
  readonly PUBLIC_FIREBASE_API_KEY: string;
  readonly PUBLIC_FIREBASE_AUTH_DOMAIN: string;
  readonly PUBLIC_FIREBASE_PROJECT_ID: string;
  readonly PUBLIC_FIREBASE_STORAGE_BUCKET: string;
  readonly PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly PUBLIC_FIREBASE_APP_ID: string;

  // エミュレータ用
  readonly FIRESTORE_EMULATOR_HOST: string;
  readonly FIREBASE_AUTH_EMULATOR_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}