import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';
import svgr from 'vite-plugin-svgr';
import Inspect from 'vite-plugin-inspect'

export default defineConfig({
  plugins: [
    react(),
    svgr({
      svgrOptions: { exportType: "default", ref: true, svgo: false, titleProp: true },
      include: "**/*.svg",
    }),
    Inspect(),
  ],
  css: {
    preprocessorOptions: {
      sass: {
        additionalData: `@use "@styles/variables.sass" as *\n`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@ui': path.resolve(__dirname, 'src/ui'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@types': path.resolve(__dirname, 'src/types'),
      '@services': path.resolve(__dirname, 'src/services'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@store': path.resolve(__dirname, 'src/store'),
    },
  },
});

