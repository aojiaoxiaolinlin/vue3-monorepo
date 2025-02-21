import { createHead } from "@unhead/vue";
import { Search } from "vant";
import { createApp } from "vue";
import App from "./App.vue";
// 禁用开发者工具
import { disableDevtool } from "./configs";
// 引入uno.css
import "@unocss/reset/tailwind.css";
import "virtual:uno.css";

import "vant/lib/index.css";
// 适配移动端的配置
import "amfe-flexible";

disableDevtool();

const head = createHead();

createApp(App).use(head).use(Search).mount("#app");
