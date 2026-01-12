<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconShuttle from "@/components/icons/IconShuttle.vue"
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
    <el-header class="cyber-header">
      <div class="scan-line"></div>
      <div class="header-content">
        <div class="left-side">
          <el-button 
            class="brand-btn" 
            type="text" 
            @click="goHome"
          >
            <IconShuttle class="shuttle-icon" />
            <span class="brand-title">qualified</span>
          </el-button>
        </div>
        <div class="right-side">
          <el-button 
            class="nav-btn" 
            type="text" 
            @click="goAbout"
          >
            Docs
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
      </div>
    </el-header>

    <el-main class="page-container">
      <slot></slot>
    </el-main>
  </div>
</template>

<style lang="sass" scoped>
.cyber-header
  width: 100%
  height: 70px
  backdrop-filter: blur(15px)
  border-bottom: 1px solid rgba(0, 255, 255, 0.25)
  box-shadow: 0 0 20px rgba(0,255,255,0.25)
  position: relative
  display: flex
  justify-content: space-between
  align-items: center
  padding: 0 20px
  overflow: hidden

.scan-line
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 2px
  background: linear-gradient(90deg, transparent, rgba(0,255,255,0.6), transparent)
  filter: blur(1px)
  animation: scan 3s linear infinite

.left-side
  display: flex
  align-items: center
  gap: 16px

.menu-btn
  &:hover
    text-shadow: 0 0 8px cyan

.brand
  display: flex
  align-items: center
  gap: 12px

.shuttle-icon
  width: 25px
  height: 25px
  filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.7))
  animation: float 4s ease-in-out infinite

.brand-title
  font-weight: 700
  letter-spacing: 3px
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3)
  text-transform: uppercase

.right-side
  display: flex
  align-items: center

.nav-btn
  text-transform: uppercase
  letter-spacing: 1px
  font-size: 0.85rem
  &:hover
    text-shadow: 0 0 8px cyan
    transform: translateY(-1px)
</style>