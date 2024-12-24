import { createApp } from 'vue'
import App from './App.vue'
import './style.css'
import { createPinia } from 'pinia'
import { router } from './router';
// 适配移动端的配置
import 'amfe-flexible';
// 禁用开发者工具
import { disableDevtool } from '../configs';
disableDevtool();
// 导入状态管理
const pinia = createPinia()
createApp(App).use(router).use(pinia).mount('#app')
