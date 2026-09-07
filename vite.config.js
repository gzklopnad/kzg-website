import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
      tailwindcss(),
      react()
  ],
  build: {
      rollupOptions: {
          output: {
              manualChunks: {
                  vendor: ['react', 'react-dom'],
                  motion: ['motion/react'],
                  i18n: ['react-i18next', 'i18next']
              }
          }
      }
  },
  server: {
      allowedHosts: true
  },
  test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: './src/setupTests.jsx',
  }
})
