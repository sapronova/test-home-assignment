import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'url'
import react from '@vitejs/plugin-react' 

export default defineConfig({
  plugins: [
    react() 
  ],
  resolve: {
    alias: [{ 
      find: '@', 
      replacement: fileURLToPath(new URL('./src', import.meta.url)) 
    }],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', '@mui/material', '@mui/icons-material'],
          employees: ['./src/features/employees/'],
        },
      },
    },
  },
  server: {
    proxy: {
      '/users': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})