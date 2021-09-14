import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@client',
        replacement: path.resolve(__dirname, './src/client'),
      },
      {
        find: '@shared',
        replacement: path.resolve(__dirname, './src/shared'),
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
  plugins: [reactRefresh()],
})
