import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator';
// 简化配置
const minimizeObfuscatorConfig = {
  options: {
    splitStrings: true,
  }
};
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [vue(), vitePluginBundleObfuscator(minimizeObfuscatorConfig)],
})
