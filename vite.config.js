import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Vite 8 / rolldown requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three-vendor'
          if (id.includes('node_modules/framer-motion')) return 'framer-vendor'
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) return 'react-vendor'
        },
      },
    },
    chunkSizeWarningLimit: 1400,
    sourcemap: false,
    target: 'es2020',
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three', 'framer-motion'],
  },
})
