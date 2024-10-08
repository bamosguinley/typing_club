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
      children: [
        {
          path: "",
          component: () => import("../components/v2Component/LandingComponent.vue"),
        },
        {
          path: "/version2/start",
          component: () => import("../components/v2Component/HomeComponent.vue"),
        }
      ]
    },
  ],
});

export default router
