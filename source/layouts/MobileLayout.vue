<script setup lang="ts">
import { useRouter } from 'vue-router'
import ThemeToggler from '@/components/togglers/ThemeToggler.vue'

defineProps<{
  isDarkTheme: boolean
}>()

const emit = defineEmits<{
  'toggle-theme': []
}>()

const router = useRouter()

const toggleTheme = () => {
  emit('toggle-theme')
}

const goHome = () => router.push('/')
const goAbout = () => router.push('/about')
const goSettings = () => router.push('/settings')
</script>


<template>
  <div class="mobile-layout">
    <el-header class="header scan-horizontal">
      <div class="left-side">
        <el-button 
          class="brand-btn" 
          type="text" 
          @click="goHome"
        >
          <span class="brand-title">qualified</span>
        </el-button>
      </div>
      <div class="right-side">
        <el-button 
          class="nav-btn" 
          type="text" 
          @click="goAbout"
        >
          Documentation
        </el-button>
        <el-button 
          class="nav-btn" 
          type="text" 
          @click="goSettings"
        >
          About
        </el-button>
        <ThemeToggler 
          :is-dark-theme="isDarkTheme" 
          @toggle-theme="toggleTheme"
        />
      </div>
    </el-header>

    <el-main class="page-container">
      <slot></slot>
    </el-main>
  </div>
</template>

<style lang="sass" scoped>
.header
  position: relative
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 20px
  width: 100%
  height: 70px
  backdrop-filter: blur(15px)
  background-color: var(--color-dark)
  border-bottom: 1px solid rgba(0, 255, 255, 0.25)
  box-shadow: 0 0 20px rgba(0,255,255,0.25)
  overflow: hidden

.left-side
  display: flex
  align-items: center
  gap: 16px

.brand
  display: flex
  align-items: center
  gap: 12px
  
.brand-title
  font-weight: 700
  letter-spacing: 3px
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3)
  text-transform: uppercase

.right-side
  display: flex
  align-items: center

.nav-btn
  letter-spacing: 1px
  font-size: 0.85rem
  &:hover
    text-shadow: 0 0 8px cyan
    transform: translateY(-1px)
</style>