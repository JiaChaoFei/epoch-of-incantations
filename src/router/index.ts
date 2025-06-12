import { createRouter, createWebHistory } from "vue-router";
import Home from "@/views/Home.vue";
import PvpBattle from "@/views/PvpBattle.vue";
import Matchmaking from "@/views/Matchmaking.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/battle",
      name: "battle",
      component: PvpBattle,
    },
    {
      path: "/matchmaking",
      name: "matchmaking",
      component: Matchmaking,
    },
  ],
});

export default router;
