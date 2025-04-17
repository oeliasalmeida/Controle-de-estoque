import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './', // Isso é CRUCIAL para caminhos relativos
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})
