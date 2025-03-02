// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	output: "server",
  	adapter: vercel(),
	vite: {
    build: {
      rollupOptions: {
        external: ["firebase-admin", "firebase-admin/auth", "firebase-admin/app"], // これで `firebase-admin` をバンドルから除外！ -> firebase-adminはNode.jsでのみ動作するため、ブラウザでの使用はできません。
      },
    },
  },
	integrations: [mdx(), sitemap()],
});
