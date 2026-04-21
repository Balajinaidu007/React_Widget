// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: 'src/main.jsx',
      output: {
        format: 'iife',
        entryFileNames: 'widget.js',
        // ✅ Inline ALL dynamic imports into widget.js
        // This is mandatory when format is 'iife' — no separate chunks
        inlineDynamicImports: true,
      },
    },
  },
});