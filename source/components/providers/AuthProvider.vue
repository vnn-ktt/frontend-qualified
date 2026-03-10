<script setup lang="ts">
import { ref, computed, provide } from 'vue'
import { useStorage } from '@vueuse/core'
import { 
  User, 
  UserFilled, 
  ArrowDown, 
  Setting, 
  SwitchButton 
} from '@element-plus/icons-vue'
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
    <div class="auth-buttons">
      <CyberButton 
        @click="openModal('login')"
        type="outline"
        glow
        size="large"
      >
        <el-icon><User /></el-icon>
        <span>Login</span>
      </CyberButton>
      
      <CyberButton 
        @click="openModal('register')"
        type="primary"
        glow
        size="large"
      >
        <el-icon><UserFilled /></el-icon>
        <span>Register</span>
      </CyberButton>
    </div>

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

    <!-- Состояние пользователя -->
    <div v-if="user" class="user-profile">
      <el-dropdown @command="handleUserCommand">
        <div class="user-dropdown-trigger">
          <el-avatar :size="40" :src="user.avatar" class="user-avatar">
            {{ user.name.charAt(0) }}
          </el-avatar>
          <span class="user-name">{{ user.name }}</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
        
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="profile">
              <el-icon><User /></el-icon>
              Profile
            </el-dropdown-item>
            <el-dropdown-item command="settings">
              <el-icon><Setting /></el-icon>
              Settings
            </el-dropdown-item>
            <el-dropdown-item divided command="logout">
              <el-icon><SwitchButton /></el-icon>
              Logout
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
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

      &:hover {
        background: rgba(0, 102, 255, 0.1);
        border-color: var(--cyber-glow);
      }

      .user-avatar {
        background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
      }

      .user-name {
        color: var(--cyber-text);
        font-weight: 600;
        font-size: 0.9rem;
      }

      .el-icon {
        color: var(--cyber-glow);
        font-size: 0.8rem;
      }
    }
  }
}
</style>