export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        format: 'es',
        entryFileNames: 'widget.js',
        chunkFileNames: '[name]-[hash].js', // IMPORTANT
        manualChunks: undefined
      }
    }
  }
});