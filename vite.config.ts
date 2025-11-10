import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    strictPort: false, // Will try 5174, 5175 if 5173 is busy
    proxy: {
      '/api': {
        target: 'https://synnectify-backend.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, '/api')
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000, // Increase limit to 1000kb to reduce warnings
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks to reduce size
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['lucide-react'],
          'auth-vendor': ['firebase/app', 'firebase/auth'],
        }
      }
    }
  },
});