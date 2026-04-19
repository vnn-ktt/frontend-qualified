<template>
  <div class="auth-provider">
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <input
          v-model="email"
          type="email"
          placeholder="Email"
          class="form-input"
          required
        />
      </div>
      <div class="form-group">
        <input
          v-model="password"
          type="password"
          placeholder="Password"
          class="form-input"
          required
        />
      </div>
      <button type="submit" class="submit-btn">
        {{ isLogin ? 'Login' : 'Register' }}
      </button>
    </form>
    <button type="button" class="toggle-btn" @click="toggleMode">
      {{ isLogin ? 'Switch to Register' : 'Switch to Login' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const email = ref('')
const password = ref('')
const isLogin = ref(true)

const emit = defineEmits<{
  'auth-change': [{ email: string; password: string; isLogin: boolean }]
}>()

const handleSubmit = () => {
  emit('auth-change', {
    email: email.value,
    password: password.value,
    isLogin: isLogin.value,
  })
  email.value = ''
  password.value = ''
}

const toggleMode = () => {
  isLogin.value = !isLogin.value
}
</script>

<style lang="sass" scoped>
.auth-provider
  display: flex
  flex-direction: column
  gap: 1rem

form
  display: flex
  flex-direction: column
  gap: 1rem

.form-group
  display: flex
  flex-direction: column

.form-input
  padding: 0.75rem
  border-radius: 6px
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.3)
  background: rgba(var(--color-dark-rgb), 0.5)
  color: var(--color-text-primary)
  font-family: inherit
  transition: all 0.3s ease

  &:focus
    outline: none
    border-color: var(--color-primary)
    background: rgba(var(--color-dark-rgb), 0.8)
    box-shadow: 0 0 12px rgba(var(--color-primary-rgb), 0.3)

.submit-btn
  padding: 0.75rem
  border-radius: 6px
  border: none
  background: var(--color-primary)
  color: white
  font-weight: 600
  cursor: pointer
  transition: all 0.3s ease

  &:hover
    background: var(--color-primary-dark, var(--color-primary))
    transform: translateY(-2px)

.toggle-btn
  padding: 0.5rem
  border-radius: 6px
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.3)
  background: transparent
  color: var(--cyber-glow)
  cursor: pointer
  transition: all 0.3s ease
  font-size: 0.85rem

  &:hover
    border-color: var(--cyber-glow)
    background: rgba(var(--cyber-glow-rgb), 0.1)
</style>
