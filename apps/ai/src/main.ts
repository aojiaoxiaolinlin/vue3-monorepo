import { router } from "#/routes";
import { createHead } from "@unhead/vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import App from "./App.vue";
// 引入uno.css

// 禁用开发者工具
import { disableDevtool } from "./configs";
import "virtual:uno.css";
import "@unocss/reset/tailwind.css";
import "./assets/index.css";

disableDevtool();

const head = createHead();
const pinia = createPinia();

createApp(App).use(router).use(head).use(pinia).mount("#app");
