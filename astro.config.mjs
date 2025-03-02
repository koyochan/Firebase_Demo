// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	output: "server",
  	adapter: vercel(),
	vite: {
    build: {
      rollupOptions: {
        external: ["firebase-admin", "firebase-admin/auth"], // これで `firebase-admin` をバンドルから除外！ -> firebase-adminはNode.jsでのみ動作するため、ブラウザでの使用はできません。
      },
    },
  },
	integrations: [mdx(), sitemap()],
});
