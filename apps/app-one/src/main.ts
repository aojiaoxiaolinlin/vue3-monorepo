// 导入apollo创建函数
import { createApolloClient } from "@lin/request";
import { VueQueryPlugin } from "@tanstack/vue-query";
import { createHead } from "@unhead/vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { Search } from "vant";
import { createApp, h, provide } from "vue";
import App from "./App.vue";
// 禁用开发者工具
import { disableDevtool, GRAPHQL_URI } from "./configs";
import { router } from "./routes";
// 引入uno.css
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";
// Markdown 配置
import "./md-editor-config";
import "vant/lib/index.css";
import "./assets/css/index.css";
// 适配移动端的配置
import "amfe-flexible";
// 禁用开发者工具
disableDevtool();

const head = createHead();

// 配置Apollo客户端
const app = createApp({
  setup() {
    provide(DefaultApolloClient, createApolloClient(GRAPHQL_URI));
  },
  render: () => h(App),
});

app.use(router).use(head).use(VueQueryPlugin).use(Search).mount("#app");
