<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { useStorage } from '@vueuse/core'
import AuthModal from '@/components/modals/AuthModal.vue'
import LoginForm from '@/components/forms/LoginForm.vue'
import RegisterForm from '@/components/forms/RegisterForm.vue'
import CyberButton from '@/components/buttons/Button.vue'

type AuthModalType = 'login' | 'register' | null
type User = {
  id: string
  name: string
  email: string
  avatar?: string
  level: number
  xp: number
}

const activeModal = ref<AuthModalType>(null)
const user = ref<User | null>(null)
const userMenuOpen = ref(false)

// Сохраняем пользователя в localStorage
const storedUser = useStorage<User | null>('codeforge-user', null)

// Инициализируем пользователя из хранилища
if (storedUser.value) {
  user.value = storedUser.value
}

const openModal = (type: AuthModalType) => {
  activeModal.value = type
}

const closeModal = () => {
  activeModal.value = null
}

const switchToRegister = () => {
  activeModal.value = 'register'
}

const switchToLogin = () => {
  activeModal.value = 'login'
}

const handleLoginSuccess = (userData: User) => {
  user.value = userData
  storedUser.value = userData
  closeModal()
  emit('auth-change', { type: 'login', user: userData })
}

const handleRegisterSuccess = (userData: User) => {
  user.value = userData
  storedUser.value = userData
  closeModal()
  emit('auth-change', { type: 'register', user: userData })
}

const handleUserCommand = (command: string) => {
  switch (command) {
    case 'logout':
      logout()
      break
    case 'profile':
      // Навигация к профилю
      break
    case 'settings':
      // Навигация к настройкам
      break
  }
  userMenuOpen.value = false
}

const logout = () => {
  user.value = null
  storedUser.value = null
  emit('auth-change', { type: 'logout', user: null })
}

// Предоставляем состояние авторизации дочерним компонентам
provide('auth', {
  user: computed(() => user.value),
  isAuthenticated: computed(() => !!user.value),
  logout
})

const emit = defineEmits<{
  'auth-change': [{ type: 'login' | 'register' | 'logout', user: User | null }]
}>()
</script>

<template>
  <div class="auth-provider">
    <!-- Кнопки авторизации -->
    <template v-if="!user">
      <div class="auth-buttons">
        <CyberButton
          @click="openModal('login')"
          type="outline"
          glow
          size="large"
        >
          <i class="pi pi-user"></i>
          <span>Login</span>
        </CyberButton>

        <CyberButton
          @click="openModal('register')"
          type="primary"
          glow
          size="large"
        >
          <i class="pi pi-user"></i>
          <span>Register</span>
        </CyberButton>
      </div>
    </template>

    <!-- Состояние пользователя -->
    <template v-else>
      <div class="user-profile">
        <div class="user-dropdown">
          <button class="user-dropdown-trigger" @click="userMenuOpen = !userMenuOpen">
            <div class="user-avatar">
              {{ user.name.charAt(0) }}
            </div>
            <span class="user-name">{{ user.name }}</span>
            <i class="pi pi-chevron-down" :class="{ 'open': userMenuOpen }"></i>
          </button>

          <ul v-if="userMenuOpen" class="user-menu">
            <li><a href="#" @click.prevent="handleUserCommand('profile')">
              <i class="pi pi-user"></i> Profile
            </a></li>
            <li><a href="#" @click.prevent="handleUserCommand('settings')">
              <i class="pi pi-cog"></i> Settings
            </a></li>
            <li class="divider"></li>
            <li><a href="#" @click.prevent="handleUserCommand('logout')">
              <i class="pi pi-power-off"></i> Logout
            </a></li>
          </ul>
        </div>
      </div>
    </template>

    <!-- Модальные окна через Teleport -->
    <Teleport to="body">
      <AuthModal
        v-if="activeModal === 'login'"
        title="Login to CodeForge"
        @close="closeModal"
      >
        <LoginForm
          @success="handleLoginSuccess"
          @switch-to-register="switchToRegister"
        />
      </AuthModal>

      <AuthModal
        v-if="activeModal === 'register'"
        title="Join CodeForge"
        @close="closeModal"
      >
        <RegisterForm
          @success="handleRegisterSuccess"
          @switch-to-login="switchToLogin"
        />
      </AuthModal>
    </Teleport>
  </div>
</template>

<style lang="scss" scoped>
.auth-provider {
  display: flex;
  align-items: center;
  gap: 15px;

  .auth-buttons {
    display: flex;
    gap: 10px;
  }

  .user-profile {
    position: relative;

    .user-dropdown {
      position: relative;
    }

    .user-dropdown-trigger {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 8px 12px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--cyber-border);
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      color: var(--cyber-text);
      font-size: 0.9rem;
      border: none;

      &:hover {
        background: rgba(0, 102, 255, 0.1);
        border-color: var(--cyber-glow);
      }

      .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: 600;
        font-size: 0.9rem;
      }

      .user-name {
        color: var(--cyber-text);
        font-weight: 600;
        font-size: 0.9rem;
        min-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .pi-chevron-down {
        color: var(--cyber-glow);
        font-size: 0.8rem;
        transition: transform 0.3s ease;

        &.open {
          transform: rotate(180deg);
        }
      }
    }

    .user-menu {
      position: absolute;
      top: 100%;
      right: 0;
      margin-top: 8px;
      background: var(--cyber-bg-card);
      border: 1px solid var(--cyber-border);
      border-radius: 8px;
      min-width: 160px;
      list-style: none;
      padding: 8px 0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      z-index: 1000;

      li {
        &.divider {
          height: 1px;
          background: var(--cyber-border);
          margin: 4px 0;
        }

        a {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          color: var(--cyber-glow);
          text-decoration: none;
          transition: all 0.3s ease;

          i {
            font-size: 0.9rem;
          }

          &:hover {
            background: rgba(var(--cyber-glow-rgb), 0.1);
            color: var(--color-accent);
          }
        }
      }
    }
  }
}
</style>