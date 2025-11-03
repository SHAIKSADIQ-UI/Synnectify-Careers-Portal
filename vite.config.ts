import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      manifest: {
        name: 'SYNNECTIFY - Professional IT Solutions & Digital Transformation',
        short_name: 'SYNNECTIFY',
        description: 'Professional IT Solutions & Digital Transformation',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: 'logo.png',
            sizes: '48x48',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '72x72',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '144x144',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    strictPort: false, // Will try 5174, 5175 if 5173 is busy
  },
});