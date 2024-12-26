import { URL, fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator';

// 简化配置
const minimizeObfuscatorConfig = {
  options: {
    // 分割字符串，保证秘钥等字符串不会轻易被搜索到
    splitStrings: true,
  }
};

// https://vite.dev/config/
export default defineConfig({
  base: '/extend-application-data/yipaysc/test/activity_you_gao_tou/h5/',
  resolve: {
    alias: {
      '#': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [vue(), vitePluginBundleObfuscator(minimizeObfuscatorConfig), AutoImport({

    imports: [
      // 插件预设支持导入的api
      'vue',
      'vue-router',
      'pinia'
      // 自定义导入的api
    ],
    dts: 'src/auto-imports.d.ts',
  })],
  esbuild: {
    // 删除console
    drop: ['console']
  },
  build: {
    // 解决使用vite-plugin-bundle-obfuscator插件并开启splitStrings后，样式丢失问题
    cssCodeSplit: false,
  },
  css: {
    postcss: {
      plugins: [
        postCssPxToRem({
          rootValue: 37.5,
          propList: ['*']
        })
      ]
    }
  }
})
