<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useAuth } from "@/composables/useAuth";
import ThemeToggler from "@/ui/togglers/ThemeToggler.vue";
import { RouteItems, RouteNames } from "@/router/types";

const props = defineProps<{
  isDarkTheme: boolean;
}>();

const emit = defineEmits<{
  "toggle-theme": [];
}>();

const route = useRoute();
const router = useRouter();
const { user, isAuthenticated, logout } = useAuth();

const pageTitle = computed(() => {
  switch (route.name) {
    case RouteNames.Home:
      return "Dashboard";
    case RouteNames.Login:
      return "Login";
    case RouteNames.Register:
      return "Create account";
    case RouteNames.Landing:
    default:
      return "Qualified";
  }
});

const pageDescription = computed(() => {
  if (route.name === RouteNames.Home) {
    return "Track progress, review questions, and continue learning.";
  }

  if (route.name === RouteNames.Login || route.name === RouteNames.Register) {
    return "Access your account and continue your learning streak.";
  }

  return "Mobile-first JavaScript and TypeScript interview training.";
});

const navItems = computed(() => {
  if (isAuthenticated.value) {
    return [
      {
        label: "Dashboard",
        route: RouteItems.home,
        active: route.path === RouteItems.home,
      },
      {
        label: "Welcome",
        route: RouteItems.landing,
        active: route.path === RouteItems.landing,
      },
    ];
  }

  return [
    {
      label: "Welcome",
      route: RouteItems.landing,
      active: route.path === RouteItems.landing,
    },
    {
      label: "Login",
      route: RouteItems.login,
      active: route.path === RouteItems.login,
    },
    {
      label: "Register",
      route: RouteItems.register,
      active: route.path === RouteItems.register,
    },
  ];
});

const goTo = (target: string) => {
  if (route.path === target) return;
  router.push(target);
};

const handleThemeToggle = () => {
  emit("toggle-theme");
};

const handleLogout = () => {
  logout();
  router.push(RouteItems.landing);
};
</script>

<template>
  <div class="mobile-layout">
    <header class="mobile-layout__header scan-horizontal">
      <div class="mobile-layout__header-top">
        <button class="mobile-layout__brand" @click="goTo(RouteItems.landing)">
          <span class="mobile-layout__brand-badge">Q</span>
          <span class="mobile-layout__brand-text">Qualified</span>
        </button>

        <div class="mobile-layout__actions">
          <ThemeToggler
            :is-dark-theme="props.isDarkTheme"
            class="mobile-layout__theme-toggle"
            @toggle-theme="handleThemeToggle"
          />

          <button
            v-if="isAuthenticated"
            class="mobile-layout__ghost-btn"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>
      </div>

      <div class="mobile-layout__hero">
        <div class="mobile-layout__hero-copy">
          <p class="mobile-layout__eyebrow">Mobile first learning</p>
          <h1 class="mobile-layout__title">{{ pageTitle }}</h1>
          <p class="mobile-layout__description">
            {{ pageDescription }}
          </p>
        </div>

        <div v-if="isAuthenticated && user" class="mobile-layout__user-card">
          <img
            v-if="user.avatar"
            :src="user.avatar"
            :alt="user.name"
            class="mobile-layout__avatar"
          />
          <div class="mobile-layout__user-meta">
            <span class="mobile-layout__user-name">{{ user.name }}</span>
            <span class="mobile-layout__user-level">
              Level {{ user.level }} · {{ user.xp }} XP
            </span>
          </div>
        </div>
      </div>

      <nav class="mobile-layout__nav">
        <button
          v-for="item in navItems"
          :key="item.route"
          class="mobile-layout__nav-btn"
          :class="{ 'mobile-layout__nav-btn--active': item.active }"
          @click="goTo(item.route)"
        >
          {{ item.label }}
        </button>
      </nav>
    </header>

    <main class="mobile-layout__content">
      <RouterView />
    </main>
  </div>
</template>

<style lang="sass" scoped>
.mobile-layout
  min-height: 100vh
  background: linear-gradient(180deg, rgba(var(--color-dark-rgb), 0.96) 0%, var(--cyber-bg-primary) 100%)
  color: var(--color-text-primary)

.mobile-layout__header
  position: sticky
  top: 0
  z-index: 20
  display: flex
  flex-direction: column
  gap: 1rem
  padding: 1rem
  backdrop-filter: blur(18px)
  background: rgba(var(--color-dark-rgb), 0.78)
  border-bottom: 1px solid rgba(var(--cyber-glow-rgb), 0.16)
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.2)

.mobile-layout__header-top
  display: flex
  align-items: center
  justify-content: space-between
  gap: 0.75rem

.mobile-layout__brand
  display: inline-flex
  align-items: center
  gap: 0.75rem
  padding: 0
  border: none
  background: transparent
  color: inherit
  cursor: pointer

.mobile-layout__brand-badge
  width: 2.2rem
  height: 2.2rem
  display: grid
  place-items: center
  border-radius: 0.8rem
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary))
  color: white
  font-weight: 800
  box-shadow: 0 0 18px rgba(var(--color-primary-rgb), 0.24)

.mobile-layout__brand-text
  font-weight: 800
  letter-spacing: 0.08em
  text-transform: uppercase

.mobile-layout__actions
  display: flex
  align-items: center
  gap: 0.5rem

.mobile-layout__ghost-btn
  min-height: 2.4rem
  padding: 0.6rem 0.85rem
  border-radius: 0.85rem
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.2)
  background: rgba(var(--cyber-glow-rgb), 0.06)
  color: var(--color-text-primary)
  font-size: 0.85rem
  cursor: pointer
  transition: all 0.2s ease

  &:hover
    border-color: rgba(var(--cyber-glow-rgb), 0.45)
    background: rgba(var(--cyber-glow-rgb), 0.12)

.mobile-layout__hero
  display: flex
  flex-direction: column
  gap: 1rem

.mobile-layout__eyebrow
  margin: 0 0 0.4rem
  font-size: 0.75rem
  text-transform: uppercase
  letter-spacing: 0.12em
  color: var(--color-text-secondary)

.mobile-layout__title
  margin: 0
  font-size: clamp(1.8rem, 8vw, 2.5rem)
  line-height: 1.05

.mobile-layout__description
  margin: 0.55rem 0 0
  color: var(--color-text-secondary)
  line-height: 1.55
  max-width: 42rem

.mobile-layout__user-card
  display: flex
  align-items: center
  gap: 0.75rem
  padding: 0.85rem 0.95rem
  border-radius: 1rem
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.18)
  background: rgba(var(--color-dark-rgb), 0.35)

.mobile-layout__avatar
  width: 2.8rem
  height: 2.8rem
  border-radius: 999px
  object-fit: cover
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.25)
  background: rgba(var(--color-dark-rgb), 0.5)

.mobile-layout__user-meta
  display: flex
  flex-direction: column
  min-width: 0

.mobile-layout__user-name
  font-weight: 700

.mobile-layout__user-level
  font-size: 0.85rem
  color: var(--color-text-secondary)

.mobile-layout__nav
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(0, 1fr))
  gap: 0.6rem

.mobile-layout__nav-btn
  min-height: 2.9rem
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.14)
  border-radius: 0.95rem
  background: rgba(var(--cyber-glow-rgb), 0.05)
  color: var(--color-text-primary)
  font-weight: 600
  cursor: pointer
  transition: all 0.2s ease

  &:hover
    background: rgba(var(--cyber-glow-rgb), 0.12)
    border-color: rgba(var(--cyber-glow-rgb), 0.28)

.mobile-layout__nav-btn--active
  background: linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.26), rgba(var(--cyber-glow-rgb), 0.16))
  border-color: rgba(var(--color-primary-rgb), 0.42)
  box-shadow: 0 0 16px rgba(var(--color-primary-rgb), 0.18)

.mobile-layout__content
  width: min(100%, 1100px)
  margin: 0 auto
  padding: 1rem 1rem 2rem

@supports (height: 100dvh)
  .mobile-layout
    min-height: 100dvh

@media (min-width: 768px)
  .mobile-layout__header
    padding: 1.25rem 1.5rem

  .mobile-layout__hero
    flex-direction: row
    align-items: flex-end
    justify-content: space-between

  .mobile-layout__hero-copy
    max-width: 42rem

  .mobile-layout__user-card
    min-width: 15rem
    justify-content: flex-start

  .mobile-layout__content
    padding: 1.5rem 1.5rem 3rem
</style>
