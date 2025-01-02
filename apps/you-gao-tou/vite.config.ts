import { URL, fileURLToPath } from 'node:url'
import { unheadVueComposablesImports } from '@unhead/vue'
import vue from '@vitejs/plugin-vue'
import postCssPxToRem from 'postcss-pxtorem'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig, loadEnv } from 'vite'
import vitePluginBundleObfuscator from 'vite-plugin-bundle-obfuscator';

// 简化配置
const minimizeObfuscatorConfig = {
  options: {
    // 分割字符串，保证秘钥等字符串不会轻易被搜索到
    splitStrings: true,
  }
};

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE,
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
        'pinia',
        unheadVueComposablesImports
        // 自定义导入的api
      ],
      dts: 'src/auto-imports.d.ts',
    })],
    // esbuild: {
    //   // 删除console
    //   drop: ['console']
    // },
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
  }
})
