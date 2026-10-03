import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import base44Plugin from '@base44/vite-plugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), base44Plugin()],
  server: {
    port: 5173,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: false
  }
})
