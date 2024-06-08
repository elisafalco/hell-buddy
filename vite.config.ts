import path from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    cssCodeSplit: false,
    minify: 'esbuild',
    sourcemap: 'hidden',
  },
  esbuild: {
    sourcemap: 'external',
    drop: ['debugger'],
    pure: ['console.log', 'console.error', 'console.debug', 'console.trace'],
  },

  // Styles
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        additionalData: `
            @use 'sass:math';
            @import "./app/src/assets/scss/utils/__index.scss";
            @import "./app/src/assets/scss/index.scss";
          `,
      },
    },
  },

  plugins: [
    vue(),
    mkcert()
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './app/src'),
      '@assets': path.resolve(__dirname, './app/src/assets'),
      '@components': path.resolve(__dirname, './app/src/components'),
    },
  },
});
