import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './dist/client',
  },
  resolve: {
    alias: [
      {
        find: '@client',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, './shared'),
      },
      {
        find: '@env',
        replacement: path.resolve(__dirname, './env'),
      },
    ],
  },
  server: {
    fs: {
      strict: false,
    },
  },
  plugins: [react()],
})
