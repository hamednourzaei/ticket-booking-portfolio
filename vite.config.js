import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'



export default {
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://hamedmkm.github.io/API-booking-Ticket/db.json', // مقصد اصلی سرور
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
};
