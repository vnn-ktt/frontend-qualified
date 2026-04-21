<template>
  <div class="auth-provider">
    <form class="auth-form" @submit.prevent="handleSubmit">
      <div v-if="formMode === 'register'" class="form-group">
        <label class="form-label" for="auth-name">Username</label>
        <input
          id="auth-name"
          v-model.trim="username"
          type="text"
          placeholder="Enter your username"
          class="form-input"
          autocomplete="username"
          :disabled="loading"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="auth-email">Email</label>
        <input
          id="auth-email"
          v-model.trim="email"
          type="email"
          placeholder="Enter your email"
          class="form-input"
          autocomplete="email"
          :disabled="loading"
          required
        />
      </div>

      <div class="form-group">
        <label class="form-label" for="auth-password">Password</label>
        <input
          id="auth-password"
          v-model="password"
          type="password"
          placeholder="Enter your password"
          class="form-input"
          autocomplete="current-password"
          :disabled="loading"
          minlength="6"
          required
        />
      </div>

      <p v-if="errorMessage" class="form-error">
        {{ errorMessage }}
      </p>

      <button type="submit" class="submit-btn" :disabled="loading">
        <span v-if="loading">{{ formMode === "login" ? "Signing in..." : "Creating account..." }}</span>
        <span v-else>{{ formMode === "login" ? "Login" : "Register" }}</span>
      </button>
    </form>

    <button
      type="button"
      class="toggle-btn"
      :disabled="loading"
      @click="toggleMode"
    >
      {{ formMode === "login" ? "Need an account? Register" : "Already have an account? Login" }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useAuth } from "@/composables/useAuth";
import type { IUser } from "@/types/user";

type AuthMode = "login" | "register";

const props = withDefaults(
  defineProps<{
    mode?: AuthMode;
  }>(),
  {
    mode: "login",
  }
);

const emit = defineEmits<{
  "auth-change": [{ type: AuthMode; user: IUser }];
  "mode-change": [mode: AuthMode];
}>();

const { login, register } = useAuth();

const username = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);
const errorMessage = ref("");
const formMode = ref<AuthMode>(props.mode);

watch(
  () => props.mode,
  (nextMode) => {
    formMode.value = nextMode;
    errorMessage.value = "";
  }
);

const isLogin = computed(() => formMode.value === "login");

const resetForm = () => {
  username.value = "";
  email.value = "";
  password.value = "";
};

const handleSubmit = async () => {
  errorMessage.value = "";

  if (!email.value || !password.value) {
    errorMessage.value = "Please fill in all required fields.";
    return;
  }

  if (!isLogin.value && !username.value) {
    errorMessage.value = "Please choose a username.";
    return;
  }

  loading.value = true;

  try {
    const user = isLogin.value
      ? await login(email.value, password.value)
      : await register(username.value, email.value, password.value);

    emit("auth-change", {
      type: formMode.value,
      user,
    });

    resetForm();
  } catch (error) {
    errorMessage.value =
      error instanceof Error ? error.message : "Authentication failed.";
  } finally {
    loading.value = false;
  }
};

const toggleMode = () => {
  const nextMode: AuthMode = isLogin.value ? "register" : "login";
  formMode.value = nextMode;
  errorMessage.value = "";
  emit("mode-change", nextMode);
};
</script>

<style lang="sass" scoped>
.auth-provider
  display: flex
  flex-direction: column
  gap: 1rem

.auth-form
  display: flex
  flex-direction: column
  gap: 1rem

.form-group
  display: flex
  flex-direction: column
  gap: 0.35rem

.form-label
  font-size: 0.85rem
  color: var(--color-text-secondary)
  letter-spacing: 0.03em

.form-input
  padding: 0.9rem 1rem
  border-radius: 10px
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.25)
  background: rgba(var(--color-dark-rgb), 0.45)
  color: var(--color-text-primary)
  font-family: inherit
  transition: all 0.25s ease

  &::placeholder
    color: var(--color-text-muted)

  &:focus
    outline: none
    border-color: rgba(var(--color-primary-rgb), 0.8)
    background: rgba(var(--color-dark-rgb), 0.7)
    box-shadow: 0 0 0 3px rgba(var(--color-primary-rgb), 0.12)

  &:disabled
    opacity: 0.7
    cursor: not-allowed

.form-error
  margin: 0
  padding: 0.8rem 1rem
  border-radius: 10px
  color: #ff9aa8
  background: rgba(255, 82, 119, 0.12)
  border: 1px solid rgba(255, 82, 119, 0.2)
  font-size: 0.9rem

.submit-btn
  padding: 0.9rem 1rem
  border-radius: 10px
  border: none
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary))
  color: white
  font-weight: 700
  cursor: pointer
  transition: transform 0.2s ease, filter 0.2s ease
  min-height: 48px

  &:hover:not(:disabled)
    transform: translateY(-2px)
    filter: brightness(1.06)

  &:disabled
    opacity: 0.75
    cursor: wait

.toggle-btn
  padding: 0.75rem
  border-radius: 10px
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.25)
  background: transparent
  color: var(--cyber-glow)
  cursor: pointer
  transition: all 0.25s ease
  font-size: 0.9rem

  &:hover:not(:disabled)
    border-color: var(--cyber-glow)
    background: rgba(var(--cyber-glow-rgb), 0.08)

  &:disabled
    opacity: 0.6
    cursor: not-allowed
</style>
