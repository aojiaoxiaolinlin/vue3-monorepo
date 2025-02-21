import { fileURLToPath, URL } from "node:url";
import { unheadVueComposablesImports } from "@unhead/vue";
import vue from "@vitejs/plugin-vue";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";
import { VueRouterAutoImports } from "unplugin-vue-router";
import VueRouter from "unplugin-vue-router/vite";

import { defineConfig } from "vite";
import vitePluginBundleObfuscator from "vite-plugin-bundle-obfuscator";

// 简化配置
const minimizeObfuscatorConfig = {
  options: {
    // 分割字符串，保证秘钥等字符串不会轻易被搜索到
    splitStrings: true,
  },
};

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "#": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  plugins: [
    VueRouter({
      routesFolder: [
        {
          src: "src/pages",
        },
      ],
      extensions: [".vue"],
      dts: "./src/typed-router.d.ts",
    }),
    vue(),
    UnoCSS(),
    vitePluginBundleObfuscator(minimizeObfuscatorConfig),
    AutoImport({
      imports: [
        // 插件预设支持导入的api
        "vue",
        "pinia",
        VueRouterAutoImports,
        unheadVueComposablesImports,
        // 自定义导入的api
      ],
      dts: "src/auto-imports.d.ts",

      // eslint报错解决
      eslintrc: {
        enabled: false, // Default `false`
        filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
        globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
      },
    }),
  ],
  // esbuild: {
  //   // 删除console
  //   drop: ['console']
  // },
  server: {
    proxy: {
      "/api": {
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ""),
        target: "http://localhost:8080/api",
        ws: true,
      },
    },
  },
  build: {
    // 解决使用vite-plugin-bundle-obfuscator插件并开启splitStrings后，样式丢失问题
    cssCodeSplit: false,
  },
  css: {
    postcss: {
      plugins: [],
    },
  },
});
