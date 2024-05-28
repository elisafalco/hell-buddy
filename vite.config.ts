import { resolve } from 'path';

import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import SVGLoader from 'vite-svg-loader';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = Object.assign(loadEnv(mode, process.cwd(), ''));

  return { 
    build: {
      cssCodeSplit: false,
      outDir: '../../dist/app',
      minify: 'esbuild',
      sourcemap: 'hidden',
    },
    esbuild: {
      sourcemap: 'external',
      drop: ['debugger'],
      pure: ['console.log', 'console.error', 'console.debug', 'console.trace'],
    },
    envDir: '../../',
    envPrefix: 'VUE_',

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
      SVGLoader({
        defaultImport: 'url',
      }),
    ],

    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
  };
});
