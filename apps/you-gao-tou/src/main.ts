import { createApp } from 'vue'
import App from './App.vue'

import './style.css'
// 适配移动端的配置
import 'amfe-flexible';
// 禁用开发者工具
import { disableDevtool } from '../configs';
disableDevtool();

createApp(App).mount('#app')
