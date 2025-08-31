import { resolve } from 'path';
import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';
import vitePluginChecker from 'vite-plugin-checker';

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
  },
  preload: {
    plugins: [externalizeDepsPlugin()],
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '@lib': resolve('src/lib'),
        '@shared': resolve('src/shared'),
      },
    },
    plugins: [
      react({
        babel: {
          parserOpts: {
            plugins: ['decorators-legacy'],
          },
        },
      }),
      vitePluginChecker({
        typescript: {
          tsconfigPath: resolve(__dirname, './tsconfig.web.json'),
        },
        eslint: {
          useFlatConfig: true,
          lintCommand: `eslint "${resolve('src/renderer/src/**/*.{ts,tsx}')}" --format=codeframe`,
          dev: {
            logLevel: ['error', 'warning'],
          },
        },
      }),
    ],
  },
});
