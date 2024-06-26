import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
    },
    {
      path: "/start",
      name: "start",
      component: () => import("../views/StartView.vue"),
    },
    {
      path: "/version2",
      name: "version2",
      component: () => import("../views/TypingV2View.vue"),
    },
  ],
});

export default router
