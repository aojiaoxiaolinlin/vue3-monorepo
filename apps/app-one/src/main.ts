// 导入apollo创建函数
import { createApolloClient } from "@lin/request";
import { createHead } from "@unhead/vue";
import { Search } from "vant";
import { createApp, h, provide } from "vue";
import App from "./App.vue";
// 禁用开发者工具
import { disableDevtool, GRAPHQL_URI } from "./configs";
// 引入uno.css
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import "vant/lib/index.css";
// 适配移动端的配置
import "amfe-flexible";
import { DefaultApolloClient } from "@vue/apollo-composable";
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

app.use(head).use(Search).mount("#app");
