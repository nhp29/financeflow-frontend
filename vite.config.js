import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// STREAMING_CHUNK: Konfigurasi standar Vite untuk React
export default defineConfig({
  plugins: [react()],
})
