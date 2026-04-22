// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Externalize Node.js only packages
      external: [
        '@vertexvis/api-client-node',
        'fs',
        'path',
        'stream',
        'process',
        'buffer',
        'util',
        'events',
        'https',
        'http',
        'zlib',
      ],
      output: {
        format: 'iife',   // critical for widget
        entryFileNames: 'widget.js',
        // Handle external modules gracefully in IIFE
        globals: {
          '@vertexvis/api-client-node': 'undefined',
          'fs': 'undefined',
          'path': 'undefined',
          'stream': 'undefined',
          'process': 'undefined',
          'buffer': 'undefined',
          'util': 'undefined',
          'events': 'undefined',
          'https': 'undefined',
          'http': 'undefined',
          'zlib': 'undefined',
        }
      }
    },
    // Reduce warnings about Node modules
    ssr: false,
  }
});