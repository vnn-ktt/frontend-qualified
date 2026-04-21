import type { RouteRecordRaw } from "vue-router";
import { RouteItems, RouteMeta, RouteNames } from "@/router/types";

export const routes: RouteRecordRaw[] = [
  {
    path: RouteItems.home,
    name: RouteNames.Home,
    component: () => import("@/pages/HomePage.vue"),
    meta: {
      title: "Dashboard | Qualified",
      requiresAuth: true,
    } satisfies RouteMeta,
  },
  {
    path: RouteItems.landing,
    name: RouteNames.Landing,
    component: () => import("@/pages/LandingPage.vue"),
    meta: {
      title: "Welcome | Qualified",
    } satisfies RouteMeta,
  },
  {
    path: RouteItems.login,
    name: RouteNames.Login,
    component: () => import("@/pages/AuthPage.vue"),
    meta: {
      title: "Login | Qualified",
      requiresGuest: true,
      authMode: "login",
    } satisfies RouteMeta,
  },
  {
    path: RouteItems.register,
    name: RouteNames.Register,
    component: () => import("@/pages/AuthPage.vue"),
    meta: {
      title: "Register | Qualified",
      requiresGuest: true,
      authMode: "register",
    } satisfies RouteMeta,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: RouteItems.landing,
  },
];
