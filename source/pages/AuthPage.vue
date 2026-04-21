<template>
  <section class="auth-page">
    <div class="auth-page__shell">
      <div class="auth-page__intro auth-card">
        <p class="auth-page__eyebrow">
          {{ isRegisterMode ? "Create your account" : "Welcome back" }}
        </p>
        <h2 class="auth-page__title">
          {{ isRegisterMode ? "Start your Qualified journey" : "Continue your learning streak" }}
        </h2>
        <p class="auth-page__subtitle">
          Practice JavaScript and TypeScript interview questions, track your XP,
          and keep everything connected across the mobile-first experience.
        </p>

        <div class="auth-page__feature-list">
          <article class="auth-page__feature">
            <i class="pi pi-bolt auth-page__feature-icon"></i>
            <div>
              <h3>Quick daily practice</h3>
              <p>Short interview drills designed for small-screen sessions.</p>
            </div>
          </article>

          <article class="auth-page__feature">
            <i class="pi pi-chart-line auth-page__feature-icon"></i>
            <div>
              <h3>Persistent progress</h3>
              <p>Your auth state, XP, and dashboard data stay in sync.</p>
            </div>
          </article>

          <article class="auth-page__feature">
            <i class="pi pi-mobile auth-page__feature-icon"></i>
            <div>
              <h3>Mobile-first flow</h3>
              <p>Landing, auth, and dashboard are connected through one layout.</p>
            </div>
          </article>
        </div>

        <button class="auth-page__back-btn" @click="router.push(RouteItems.landing)">
          <i class="pi pi-arrow-left"></i>
          Back to landing
        </button>
      </div>

      <div class="auth-page__form auth-card">
        <div class="auth-page__form-header">
          <p class="auth-page__eyebrow">Account access</p>
          <h3>{{ isRegisterMode ? "Register" : "Login" }}</h3>
          <p>
            {{ isRegisterMode
              ? "Create a demo-ready account and jump right into the dashboard."
              : "Sign in to continue from your current level and XP." }}
          </p>
        </div>

        <AuthProvider
          :mode="mode"
          @auth-change="handleAuthChange"
          @mode-change="handleModeChange"
        />

        <div class="auth-page__divider">
          <span>Need a quick preview?</span>
        </div>

        <button class="auth-page__demo-btn" @click="useDemoAccount">
          <i class="pi pi-user"></i>
          Use demo account
        </button>
      </div>
    </div>

    <transition name="slide-up">
      <div v-if="showWelcome" class="auth-page__welcome">
        <i class="pi pi-check-circle"></i>
        <div>
          <h4>Welcome, {{ userName }}!</h4>
          <p>Redirecting to your dashboard…</p>
        </div>
      </div>
    </transition>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { useAuth } from "@/composables/useAuth";
import { RouteItems, type AuthMode } from "@/router/types";
import AuthProvider from "@/ui/providers/AuthProvider.vue";
import type { IUser } from "@/types/user";

const route = useRoute();
const router = useRouter();
const toast = useToast();
const { login } = useAuth();

const showWelcome = ref(false);
const userName = ref("");

const mode = computed<AuthMode>(() => {
  return route.meta.authMode === "register" ? "register" : "login";
});

const isRegisterMode = computed(() => mode.value === "register");

const handleModeChange = (nextMode: AuthMode) => {
  router.push(nextMode === "register" ? RouteItems.register : RouteItems.login);
};

const redirectToDashboard = () => {
  window.setTimeout(() => {
    router.push(RouteItems.home);
  }, 900);
};

const handleAuthChange = (event: { type: AuthMode; user: IUser }) => {
  userName.value = event.user.name;
  showWelcome.value = true;

  toast.add({
    severity: "success",
    summary: event.type === "register" ? "Account created" : "Signed in",
    detail: `Welcome, ${event.user.name}!`,
    life: 2500,
  });

  redirectToDashboard();
};

const useDemoAccount = async () => {
  const demoUser = await login("demo@qualified.dev", "123456");

  handleAuthChange({
    type: "login",
    user: {
      ...demoUser,
      name: "Demo User",
      xp: 720,
      level: 3,
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo-Qualified",
    },
  });
};
</script>

<style lang="sass" scoped>
.auth-page
  position: relative
  min-height: 100%
  display: flex
  flex-direction: column

.auth-page__shell
  display: grid
  gap: 1rem

.auth-card
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.14)
  background: rgba(var(--color-dark-rgb), 0.52)
  backdrop-filter: blur(10px)
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.18)
  border-radius: 1.25rem
  padding: 1.1rem

.auth-page__eyebrow
  margin: 0 0 0.45rem
  font-size: 0.75rem
  text-transform: uppercase
  letter-spacing: 0.12em
  color: var(--color-text-secondary)

.auth-page__title
  margin: 0
  font-size: clamp(1.7rem, 7vw, 2.4rem)
  line-height: 1.08

.auth-page__subtitle
  margin: 0.75rem 0 0
  color: var(--color-text-secondary)
  line-height: 1.6

.auth-page__feature-list
  display: flex
  flex-direction: column
  gap: 0.8rem
  margin-top: 1.25rem

.auth-page__feature
  display: flex
  gap: 0.8rem
  align-items: flex-start
  padding: 0.9rem
  border-radius: 1rem
  background: rgba(var(--cyber-glow-rgb), 0.05)
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.1)

  h3
    margin: 0 0 0.25rem
    font-size: 1rem

  p
    margin: 0
    color: var(--color-text-secondary)
    line-height: 1.5

.auth-page__feature-icon
  color: var(--color-primary)
  font-size: 1.1rem
  margin-top: 0.15rem

.auth-page__back-btn,
.auth-page__demo-btn
  min-height: 3rem
  display: inline-flex
  align-items: center
  justify-content: center
  gap: 0.55rem
  border-radius: 0.95rem
  cursor: pointer
  font-weight: 700
  transition: all 0.2s ease

.auth-page__back-btn
  margin-top: 1.25rem
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.18)
  background: transparent
  color: var(--color-text-primary)

  &:hover
    background: rgba(var(--cyber-glow-rgb), 0.08)

.auth-page__form
  display: flex
  flex-direction: column
  gap: 1rem

.auth-page__form-header
  h3
    margin: 0
    font-size: 1.45rem

  p
    margin: 0.55rem 0 0
    color: var(--color-text-secondary)
    line-height: 1.55

.auth-page__divider
  position: relative
  display: flex
  align-items: center
  justify-content: center
  color: var(--color-text-secondary)
  font-size: 0.9rem
  margin-top: 0.25rem

  &::before
    content: ""
    position: absolute
    inset-inline: 0
    top: 50%
    height: 1px
    background: rgba(var(--cyber-glow-rgb), 0.12)

  span
    position: relative
    padding: 0 0.8rem
    background: rgba(var(--color-dark-rgb), 0.9)

.auth-page__demo-btn
  border: none
  color: white
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary))

  &:hover
    transform: translateY(-2px)
    filter: brightness(1.05)

.auth-page__welcome
  position: fixed
  left: 1rem
  right: 1rem
  bottom: 1rem
  z-index: 30
  display: flex
  gap: 0.85rem
  align-items: center
  padding: 1rem
  border-radius: 1rem
  border: 1px solid rgba(80, 220, 120, 0.22)
  background: rgba(var(--color-dark-rgb), 0.9)
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.28)

  i
    color: #53d769
    font-size: 1.4rem

  h4
    margin: 0 0 0.2rem

  p
    margin: 0
    color: var(--color-text-secondary)

.slide-up-enter-active,
.slide-up-leave-active
  transition: all 0.25s ease

.slide-up-enter-from,
.slide-up-leave-to
  opacity: 0
  transform: translateY(16px)

@media (min-width: 900px)
  .auth-page__shell
    grid-template-columns: 1fr 0.95fr
    align-items: start

  .auth-page__welcome
    left: auto
    right: 1.5rem
    width: 22rem
</style>
