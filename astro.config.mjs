// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
// Pure static build for Cloudflare Workers Sites
export default defineConfig({
  site: 'https://collections.paperlanterns.ink',
  output: 'static',
  build: {
    inlineStylesheets: 'always', // Inline all CSS for faster FCP/LCP
    assets: '_assets'
  },
  vite: {
    build: {
      cssCodeSplit: false, // Single CSS bundle for better compression
      rollupOptions: {
        output: {
          manualChunks: undefined,
        }
      }
    }
  },
  compressHTML: true
});
