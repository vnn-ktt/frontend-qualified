<template>
  <form @submit.prevent="handleSubmit" class="login-form">
    <!-- Email -->
    <div class="form-item">
      <div class="input-wrapper">
        <i class="pi pi-envelope input-icon"></i>
        <input
          v-model="form.email"
          type="email"
          placeholder="Enter your email"
          class="cyber-input"
          @blur="validateEmail"
        />
      </div>
      <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
    </div>

    <!-- Password -->
    <div class="form-item">
      <div class="input-wrapper">
        <i class="pi pi-lock input-icon"></i>
        <input
          v-model="form.password"
          type="password"
          placeholder="Enter your password"
          class="cyber-input"
          @blur="validatePassword"
        />
      </div>
      <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
    </div>

    <!-- Remember me & Forgot password -->
    <div class="form-options">
      <div class="checkbox-wrapper">
        <input type="checkbox" v-model="form.remember" class="remember-checkbox" />
        <label class="checkbox-label">Remember me</label>
      </div>
      <a href="#" class="forgot-link" @click.prevent="forgotPassword">
        Forgot password?
      </a>
    </div>

    <!-- Submit button -->
    <div class="form-item">
      <CyberButton
        type="primary"
        size="large"
        :loading="loading"
        native-type="submit"
        glow
        full-width
        class="login-btn"
      >
        <i v-if="!loading" class="pi pi-arrow-right"></i>
        <span>Login</span>
      </CyberButton>
    </div>

    <!-- Divider -->
    <div class="divider">
      <span class="divider-text">or continue with</span>
    </div>

    <!-- Switch to register -->
    <div class="switch-auth">
      <span class="switch-text">Don't have an account?</span>
      <a href="#" class="switch-link" @click.prevent="switchToRegister">
        Register now
      </a>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useToast } from 'primevue/usetoast'
import CyberButton from '@/components/buttons/Button.vue'

const toast = useToast()

const emit = defineEmits<{
  success: [user: any]
  'switch-to-register': []
}>()

const loading = ref(false)
const errors = reactive<Record<string, string>>({
  email: '',
  password: ''
})

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const validateEmail = () => {
  const email = form.email.trim()
  if (!email) {
    errors.email = 'Please input email'
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    errors.email = 'Please input valid email'
    return false
  }
  errors.email = ''
  return true
}

const validatePassword = () => {
  const password = form.password
  if (!password) {
    errors.password = 'Please input password'
    return false
  }
  if (password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    return false
  }
  errors.password = ''
  return true
}

const validateForm = () => {
  return validateEmail() && validatePassword()
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    loading.value = true

    // Имитация запроса
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockUser = {
      id: '1',
      name: 'John Doe',
      email: form.email,
      level: 1,
      xp: 150,
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'
    }

    toast.add({ severity: 'success', summary: 'Success', detail: 'Login successful!', life: 3000 })
    emit('success', mockUser)
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Invalid credentials', life: 3000 })
  } finally {
    loading.value = false
  }
}

const forgotPassword = () => {
  toast.add({ severity: 'info', summary: 'Info', detail: 'Password reset feature coming soon!', life: 3000 })
}

const socialLogin = (provider: string) => {
  toast.add({ severity: 'info', summary: 'Info', detail: `${provider} login coming soon!`, life: 3000 })
}

const switchToRegister = () => {
  emit('switch-to-register')
}
</script>

<style lang="scss" scoped>
.login-form {
  .form-item {
    margin-bottom: 20px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .input-icon {
    position: absolute;
    left: 12px;
    color: var(--cyber-glow);
    font-size: 1rem;
    z-index: 1;
  }

  input[type="email"],
  input[type="password"],
  input[type="text"] {
    width: 100%;
    padding: 10px 16px 10px 40px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--cyber-border);
    border-radius: 10px;
    color: var(--color-text-primary);
    transition: all 0.3s ease;
    font-family: inherit;
    font-size: 1rem;

    &::placeholder {
      color: var(--color-text-muted);
    }

    &:hover {
      border-color: var(--cyber-glow);
    }

    &:focus {
      border-color: var(--cyber-glow);
      box-shadow: 0 0 10px rgba(var(--cyber-glow-rgb), 0.3);
      outline: none;
    }
  }

  .form-error {
    display: block;
    color: var(--color-negative);
    font-size: 0.8rem;
    margin-top: 5px;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .checkbox-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: var(--cyber-glow);
      }
    }

    .checkbox-label {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
    }

    .forgot-link {
      font-size: 0.9rem;
      color: var(--cyber-glow);
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        color: var(--color-accent);
        text-decoration: underline;
      }
    }
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;

    span {
      margin-left: 8px;
    }
  }

  .divider {
    display: flex;
    align-items: center;
    margin: 30px 0;
    color: var(--color-text-muted);

    &::before,
    &::after {
      content: '';
      flex: 1;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--cyber-border),
        transparent
      );
    }

    .divider-text {
      padding: 0 15px;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
  }

  .switch-auth {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid rgba(var(--cyber-glow-rgb), 0.1);

    .switch-text {
      color: var(--color-text-secondary);
      margin-right: 8px;
    }

    .switch-link {
      font-weight: 600;
      font-size: 0.95rem;
      color: var(--cyber-glow);
      text-decoration: none;
      transition: all 0.3s ease;

      &:hover {
        color: var(--color-accent);
        text-decoration: underline;
      }
    }
  }
}

.cyber-input {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--cyber-border);
  border-radius: 10px;
  transition: all 0.3s ease;

  &:hover {
    border-color: var(--cyber-glow);
  }

  &.p-focus {
    border-color: var(--cyber-glow);
    box-shadow: 0 0 10px rgba(var(--cyber-glow-rgb), 0.3);
  }
}
</style>
