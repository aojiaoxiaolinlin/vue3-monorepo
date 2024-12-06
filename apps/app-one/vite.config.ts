import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [vue()],
})
