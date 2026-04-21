import App from "@/App.vue";
import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import PrimeVue from "primevue/config";
import Toast from "primevue/toast";
import ToastService from "primevue/toastservice";
import { AUTH_STORAGE_KEY } from "@/composables/useAuth";
import { routes } from "@/router";
import { RouteItems } from "@/router/types";
//@ts-ignore
import "@/assets/styles/app.sass";
//@ts-ignore
import "primeicons/primeicons.css";

const app = createApp(App);

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const hasAuthenticatedUser = () => {
  const rawUser = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!rawUser) return false;

  try {
    const parsedUser = JSON.parse(rawUser);
    return Boolean(parsedUser?.token);
  } catch {
    return false;
  }
};

router.beforeEach((to) => {
  const isAuthenticated = hasAuthenticatedUser();

  if (to.meta.requiresGuest && isAuthenticated) {
    return RouteItems.home;
  }

  if (to.meta.requiresAuth && !isAuthenticated) {
    return RouteItems.login;
  }

  return true;
});

router.afterEach((to) => {
  document.title = typeof to.meta.title === "string" ? to.meta.title : "Qualified";
});

app.use(router);
app.use(PrimeVue);
app.use(ToastService);
app.component("Toast", Toast);

app.mount("#app");
