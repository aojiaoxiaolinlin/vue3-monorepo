import { type RouteRecordRaw, createRouter, createWebHashHistory } from "vue-router";
// import { useGameStore } from "#/stores";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/January/two/Home.vue"),
  },
  {
    path: "/coupons",
    name: "coupons",
    component: () => import("../views/CouponList.vue"),
  },
  {
    path: "/question",
    name: "question",
    component: () => import("../views/January/one/Question.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// // 配置路由守卫
// router.beforeEach((to, from, next) => {
//   const gameStore = useGameStore();
//   // ...
//   if (to.name !== 'home' && !gameStore.isLogin) {
//     next({ name: 'home' });
//   } else {
//     next();
//   }
// })

export { router };
