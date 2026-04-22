import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // IMPORTANT for Vercel/widget environments

  build: {
    rollupOptions: {
      output: {
        format: 'es', // ✅ allow dynamic imports
        entryFileNames: 'widget.js',
        chunkFileNames: 'chunks/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]'
      }
    }
  }
});