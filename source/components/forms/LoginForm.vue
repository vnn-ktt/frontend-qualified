<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { 
  Message, 
  Lock, 
  Right
} from '@element-plus/icons-vue'
import CyberButton from '@/components/buttons/Button.vue'

const emit = defineEmits<{
  success: [user: any]
  'switch-to-register': []
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  email: '',
  password: '',
  remember: false
})

const rules: FormRules = {
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input valid email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
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
    
    ElMessage.success('Login successful!')
    emit('success', mockUser)
  } catch (error) {
    ElMessage.error('Invalid credentials')
  } finally {
    loading.value = false
  }
}

const forgotPassword = () => {
  ElMessage.info('Password reset feature coming soon!')
}

const socialLogin = (provider: string) => {
  ElMessage.info(`${provider} login coming soon!`)
}

const switchToRegister = () => {
  emit('switch-to-register')
}
</script>

<template>
  <el-form 
    ref="formRef" 
    :model="form" 
    :rules="rules" 
    @submit.prevent="handleSubmit"
    class="login-form"
  >
    <!-- Email -->
    <el-form-item prop="email">
      <el-input
        v-model="form.email"
        placeholder="Enter your email"
        size="large"
        :prefix-icon="Message"
        class="cyber-input"
      >
        <template #prefix>
          <el-icon class="input-icon"><Message /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- Password -->
    <el-form-item prop="password">
      <el-input
        v-model="form.password"
        type="password"
        placeholder="Enter your password"
        size="large"
        show-password
        :prefix-icon="Lock"
        class="cyber-input"
      >
        <template #prefix>
          <el-icon class="input-icon"><Lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>

    <!-- Remember me & Forgot password -->
    <div class="form-options">
      <el-checkbox v-model="form.remember" label="Remember me" />
      <el-link type="primary" :underline="false" @click="forgotPassword">
        Forgot password?
      </el-link>
    </div>

    <!-- Submit button -->
    <el-form-item>
      <CyberButton
        type="primary"
        size="large"
        :loading="loading"
        native-type="submit"
        glow
        full-width
        class="login-btn"
      >
        <el-icon v-if="!loading"><Right /></el-icon>
        <span>Login</span>
      </CyberButton>
    </el-form-item>

    <!-- Divider -->
    <div class="divider">
      <span class="divider-text">or continue with</span>
    </div>

    <!-- Switch to register -->
    <div class="switch-auth">
      <span class="switch-text">Don't have an account?</span>
      <el-link 
        type="primary" 
        :underline="false" 
        @click="switchToRegister"
        class="switch-link"
      >
        Register now
      </el-link>
    </div>
  </el-form>
</template>

<style lang="scss" scoped>
.login-form {
  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    :deep(.el-checkbox__label) {
      color: var(--color-text-secondary);
    }

    .el-link {
      font-size: 0.9rem;
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

    &::before, &::after {
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

  .social-login {
    display: flex;
    gap: 15px;
    margin-bottom: 25px;

    .social-btn {
      flex: 1;
      justify-content: center;
      
      .el-icon {
        margin-right: 8px;
      }
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
    }
  }
}

.cyber-input {
  :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--cyber-border);
    border-radius: 10px;
    transition: all 0.3s ease;

    &:hover {
      border-color: var(--cyber-glow);
    }

    &.is-focus {
      border-color: var(--cyber-glow);
      box-shadow: 0 0 10px rgba(var(--cyber-glow-rgb), 0.3);
    }
  }

  .input-icon {
    color: var(--cyber-glow);
  }
}
</style>