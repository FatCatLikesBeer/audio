import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: './10.0.0.10+2-key.pem',
      cert: './10.0.0.10+2.pem'
    },
    host: true,
    port: 5173,
  },
})
