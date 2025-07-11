import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    host: '0.0.0.0',
    port: 3000,
    proxy:{
      '/api': {
        target :import.meta.env.MODE==="development" ? 'http://localhost:5000/api':"/api",
        changeOrigin: true,  // enables CORS for proxying
      }  // replace with your backend server's URL
    }
  }
})
