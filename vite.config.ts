import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      // Restrict file serving to project root only
      strict: true,
      // Optionally, allow only specific directories
      allow: ['src', 'public']
    }
  },
  build: {
    rollupOptions: {
      // Prevent hidden files from being included in build
      input: {
        main: 'index.html'
      }
    }
  }
})
