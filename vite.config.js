import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Dynamicznie ustawiamy bazową ścieżkę w zależności od środowiska
export default defineConfig({
  plugins: [vue()],
  base: process.env.NODE_ENV === 'production' ? '/TrainMe/' : './',
  build: {
    rollupOptions: {
      output: {
        // Zapewnia, że ścieżki do zasobów są względne
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  }
})
