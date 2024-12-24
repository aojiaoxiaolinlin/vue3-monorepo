import { type RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'



const routes: RouteRecordRaw[] = [
  { path: '/', component: () => import('../views/Home.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export { router }
