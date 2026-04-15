<template>
  <form @submit.prevent="handleSubmit" class="register-form">
    <!-- Username -->
    <div class="form-item">
      <div class="input-wrapper">
        <i class="pi pi-user input-icon"></i>
        <input
          v-model="form.username"
          type="text"
          placeholder="Choose a username"
          class="cyber-input"
          @blur="validateUsername"
        />
      </div>
      <span v-if="errors.username" class="form-error">{{ errors.username }}</span>
    </div>

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
          placeholder="Create a password"
          class="cyber-input"
          @blur="validatePassword"
        />
      </div>
      <span v-if="errors.password" class="form-error">{{ errors.password }}</span>
    </div>

    <!-- Confirm Password -->
    <div class="form-item">
      <div class="input-wrapper">
        <i class="pi pi-lock input-icon"></i>
        <input
          v-model="form.confirmPassword"
          type="password"
          placeholder="Confirm password"
          class="cyber-input"
          @blur="validateConfirmPassword"
        />
      </div>
      <span v-if="errors.confirmPassword" class="form-error">{{ errors.confirmPassword }}</span>
    </div>

    <!-- Terms -->
    <div class="form-item terms-item">
      <div class="checkbox-wrapper">
        <input type="checkbox" v-model="form.terms" class="term-checkbox" />
        <label class="terms-label">
          I agree to the
          <a href="#" @click.prevent>Terms of Service</a>
          and
          <a href="#" @click.prevent>Privacy Policy</a>
        </label>
      </div>
      <span v-if="errors.terms" class="form-error">{{ errors.terms }}</span>
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
        class="register-btn"
      >
        <i v-if="!loading" class="pi pi-arrow-right"></i>
        <span>Create Account</span>
      </CyberButton>
    </div>

    <!-- Switch to login -->
    <div class="switch-auth">
      <span class="switch-text">Already have an account?</span>
      <a href="#" class="switch-link" @click.prevent="switchToLogin">
        Login here
      </a>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import CyberButton from '@/components/buttons/Button.vue'

const toast = useToast()

const emit = defineEmits<{
  success: [user: any]
  'switch-to-login': []
}>()

const loading = ref(false)
const errors = reactive<Record<string, string>>({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: ''
})

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const validateUsername = () => {
  const username = form.username.trim()
  if (!username) {
    errors.username = 'Please input username'
    return false
  }
  if (username.length < 3) {
    errors.username = 'Username must be at least 3 characters'
    return false
  }
  errors.username = ''
  return true
}

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
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)/
  if (!passwordRegex.test(password)) {
    errors.password = 'Password must contain letters and numbers'
    return false
  }
  errors.password = ''
  return true
}

const validateConfirmPassword = () => {
  const confirmPassword = form.confirmPassword
  if (!confirmPassword) {
    errors.confirmPassword = 'Please confirm password'
    return false
  }
  if (confirmPassword !== form.password) {
    errors.confirmPassword = 'Passwords do not match'
    return false
  }
  errors.confirmPassword = ''
  return true
}

const validateTerms = () => {
  if (!form.terms) {
    errors.terms = 'You must accept the terms'
    return false
  }
  errors.terms = ''
  return true
}

const validateForm = () => {
  return (
    validateUsername() &&
    validateEmail() &&
    validatePassword() &&
    validateConfirmPassword() &&
    validateTerms()
  )
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    loading.value = true

    // Имитация запроса
    await new Promise(resolve => setTimeout(resolve, 1000))

    const mockUser = {
      id: '1',
      name: form.username,
      email: form.email,
      level: 1,
      xp: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.username}`
    }

    toast.add({ severity: 'success', summary: 'Success', detail: 'Account created successfully!', life: 3000 })
    emit('success', mockUser)
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Please check your inputs', life: 3000 })
  } finally {
    loading.value = false
  }
}

const switchToLogin = () => {
  emit('switch-to-login')
}

// Auto-validate confirmPassword when password changes
watch(() => form.password, () => {
  if (form.confirmPassword) {
    validateConfirmPassword()
  }
})
</script>

<style lang="scss" scoped>
.register-form {
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

  .terms-item {
    margin-bottom: 20px;

    .checkbox-wrapper {
      display: flex;
      align-items: flex-start;
      gap: 8px;

      input[type="checkbox"] {
        width: 18px;
        height: 18px;
        cursor: pointer;
        accent-color: var(--cyber-glow);
        margin-top: 2px;
        flex-shrink: 0;
      }
    }

    .terms-label {
      color: var(--color-text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;

      a {
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

  .register-btn {
    width: 100%;
    margin-top: 10px;

    span {
      margin-left: 8px;
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
