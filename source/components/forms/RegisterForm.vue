<template>
  <el-form 
    ref="formRef" 
    :model="form" 
    :rules="rules" 
    @submit.prevent="handleSubmit"
    class="register-form"
  >
    <!-- Username -->
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="Choose a username"
        size="large"
        :prefix-icon="User"
        class="cyber-input"
      >
        <template #prefix>
          <el-icon class="input-icon"><User /></el-icon>
        </template>
      </el-input>
    </el-form-item>

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
        placeholder="Create a password"
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

    <!-- Confirm Password -->
    <el-form-item prop="confirmPassword">
      <el-input
        v-model="form.confirmPassword"
        type="password"
        placeholder="Confirm password"
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

    <!-- Terms -->
    <el-form-item prop="terms">
      <el-checkbox v-model="form.terms">
        I agree to the 
        <el-link type="primary" :underline="false">Terms of Service</el-link> 
        and 
        <el-link type="primary" :underline="false">Privacy Policy</el-link>
      </el-checkbox>
    </el-form-item>

    <!-- Submit button -->
    <el-form-item>
      <CyberButton
        type="primary"
        size="large"
        :loading="loading"
        native-type="submit"
        glow
        full-width
        class="register-btn"
      >
        <el-icon v-if="!loading"><Right /></el-icon>
        <span>Create Account</span>
      </CyberButton>
    </el-form-item>

    <!-- Switch to login -->
    <div class="switch-auth">
      <span class="switch-text">Already have an account?</span>
      <el-link 
        type="primary" 
        :underline="false" 
        @click="switchToLogin"
        class="switch-link"
      >
        Login here
      </el-link>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { ElMessage, type FormInstance, type FormRules } from 'element-plus'
import { 
  User, 
  Message, 
  Lock, 
  Right 
} from '@element-plus/icons-vue'
import CyberButton from '@/components/buttons/Button.vue'

const emit = defineEmits<{
  success: [user: any]
  'switch-to-login': []
}>()

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
})

const validatePassword = (rule: any, value: string, callback: Function) => {
  if (value === '') {
    callback(new Error('Please confirm password'))
  } else if (value !== form.password) {
    callback(new Error('Passwords do not match'))
  } else {
    callback()
  }
}

const validateTerms = (rule: any, value: boolean, callback: Function) => {
  if (!value) {
    callback(new Error('You must accept the terms'))
  } else {
    callback()
  }
}

const rules: FormRules = {
  username: [
    { required: true, message: 'Please input username', trigger: 'blur' },
    { min: 3, message: 'Username must be at least 3 characters', trigger: 'blur' }
  ],
  email: [
    { required: true, message: 'Please input email', trigger: 'blur' },
    { type: 'email', message: 'Please input valid email', trigger: 'blur' }
  ],
  password: [
    { required: true, message: 'Please input password', trigger: 'blur' },
    { min: 6, message: 'Password must be at least 6 characters', trigger: 'blur' },
    { 
      pattern: /^(?=.*[A-Za-z])(?=.*\d)/,
      message: 'Password must contain letters and numbers',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    { validator: validatePassword, trigger: 'blur' }
  ],
  terms: [
    { validator: validateTerms, trigger: 'change' }
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
      name: form.username,
      email: form.email,
      level: 1,
      xp: 0,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.username}`
    }
    
    ElMessage.success('Account created successfully!')
    emit('success', mockUser)
  } catch (error) {
    ElMessage.error('Please check your inputs')
  } finally {
    loading.value = false
  }
}

const switchToLogin = () => {
  emit('switch-to-login')
}
</script>

<style lang="scss" scoped>
.register-form {
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
    }
  }
}

:deep(.el-form-item) {
  margin-bottom: 20px;
  
  .el-form-item__error {
    color: var(--color-negative);
    font-size: 0.8rem;
    margin-top: 5px;
  }
}
</style>