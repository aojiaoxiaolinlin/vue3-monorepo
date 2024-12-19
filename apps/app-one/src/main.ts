import { Search } from 'vant';
import { createApp } from 'vue'
import './style.css'
import 'vant/lib/index.css';
import App from './App.vue'

createApp(App).use(Search).mount('#app')
