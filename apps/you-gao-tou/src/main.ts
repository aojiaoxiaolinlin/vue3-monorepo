import { createHead } from "@unhead/vue";
import { createPinia } from "pinia";
import { CountDown, Icon, Loading, Search } from "vant";
import { createApp } from "vue";
import App from "./App.vue";
import { router } from "./router";
import "vant/lib/index.css";
import "./style.css";

// 适配移动端的配置
import "amfe-flexible";
// 禁用开发者工具
import { disableDevtool } from "../configs";
disableDevtool();

const pinia = createPinia();
const head = createHead();

createApp(App).use(head).use(pinia).use(router).use(Search).use(Icon).use(Loading).use(CountDown).mount("#app");
