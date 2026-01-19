<template>
  <div class="mobile-layout">
    <el-header class="header scan-horizontal">
      <div class="header-content">
        <!-- Левый блок -->
        <div class="left-side">
          <el-button 
            class="brand-btn" 
            type="text" 
            @click="goHome"
          >
            <span class="brand-title">qualified</span>
          </el-button>
        </div>

        <!-- Правый блок -->
        <div class="right-side">
          <!-- Дополнительное меню появляется на планшетах -->
          <div class="desktop-nav">
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
          </div>
          
          <ThemeToggler 
            :is-dark-theme="isDarkTheme" 
            @toggle-theme="toggleTheme"
            class="theme-toggle"
          />
          
          <!-- Мобильное меню -->
          <el-dropdown 
            class="mobile-menu"
            trigger="click"
            placement="bottom-end"
          >
            <el-button 
              class="menu-btn"
              type="text"
              circle
            >
              <el-icon><More /></el-icon>
            </el-button>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="goAbout">
                  <el-icon><Document /></el-icon>
                  Documentation
                </el-dropdown-item>
                <el-dropdown-item @click="goSettings">
                  <el-icon><InfoFilled /></el-icon>
                  About
                </el-dropdown-item>
                <el-dropdown-item divided @click="toggleTheme">
                  <el-icon><MoonNight /></el-icon>
                  Toggle Theme
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </div>
    </el-header>

    <el-main class="page-container">
      <slot />
    </el-main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { 
  More, 
  Document, 
  InfoFilled,
  MoonNight 
} from '@element-plus/icons-vue'
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

<style lang="sass" scoped>
.mobile-layout
  min-height: 100vh
  background: var(--cyber-bg-primary)

  @include breakpoints.media(telegram-tablet)
    max-width: 1200px
    margin: 0 auto

.header
  position: sticky
  top: 0
  z-index: 100
  display: flex
  align-items: center
  width: 100%
  height: 70px
  backdrop-filter: blur(15px)
  background: rgba(var(--color-dark), 0.85)
  border-bottom: 1px solid rgba(var(--cyber-glow-rgb), 0.25)
  box-shadow: 0 0 20px rgba(var(--cyber-glow-rgb), 0.25)
  transition: all 0.3s ease

  @include breakpoints.safe-area-top
  padding-left: max(16px, env(safe-area-inset-left))
  padding-right: max(16px, env(safe-area-inset-right))

  @include breakpoints.media(md)
    height: 80px

  @include breakpoints.media(xl)
    height: 90px

  .header-content
    width: 100%
    display: flex
    justify-content: space-between
    align-items: center

    @include breakpoints.telegram-container

.left-side
  display: flex
  align-items: center
  gap: 16px

  .brand-btn
    padding: 8px 12px
    border-radius: 8px
    background: rgba(var(--color-primary-rgb), 0.1)
    border: 1px solid rgba(var(--color-primary-rgb), 0.2)
    transition: all 0.3s ease

    &:hover
      background: rgba(var(--color-primary-rgb), 0.2)
      border-color: rgba(var(--color-primary-rgb), 0.4)
      transform: translateY(-2px)

    .brand-title
      font-weight: 700
      letter-spacing: 3px
      text-transform: uppercase
      text-shadow: 0 0 10px rgba(var(--cyber-glow-rgb), 0.3)

      @include breakpoints.responsive-font(1rem, 1.5rem)

      @include breakpoints.media(md, down)
        letter-spacing: 2px

.right-side
  display: flex
  align-items: center
  gap: 12px

  @include breakpoints.media(md)
    gap: 16px

  @include breakpoints.media(lg)
    gap: 20px

  .desktop-nav
    display: none

    @include breakpoints.media(md)
      display: flex
      gap: 12px

    @include breakpoints.media(xxl)
      gap: 16px

  .mobile-menu
    display: block

    @include breakpoints.media(md)
      display: none

    .menu-btn
      @include breakpoints.telegram-button
      color: var(--cyber-glow)

      &:hover
        color: var(--color-text-primary)
        background: rgba(var(--cyber-glow-rgb), 0.1)

  .theme-toggle
    display: none

    @include breakpoints.media(md)
      display: block

.nav-btn
  letter-spacing: 1px
  text-transform: uppercase
  font-size: 0.85rem
  padding: 6px 12px
  border-radius: 6px
  transition: all 0.3s ease

  @include breakpoints.media(md, down)
    font-size: 0.8rem
    padding: 4px 8px

  @include breakpoints.media(xxl)
    font-size: 0.9rem
    padding: 8px 16px

  &:hover
    color: var(--cyber-glow)
    text-shadow: 0 0 8px rgba(var(--cyber-glow-rgb), 0.8)
    transform: translateY(-1px)
    background: rgba(var(--cyber-glow-rgb), 0.1)

.page-container
  padding: 16px
  min-height: calc(100vh - 70px)

  @include breakpoints.safe-area-bottom
  @include breakpoints.responsive-padding(16px, 32px)

  @include breakpoints.media(telegram-desktop)
    padding: 24px

  @include breakpoints.media(xxl)
    max-width: 1200px
    margin: 0 auto

@media (max-width: 340px)
  .brand-title
    font-size: 0.9rem !important
    letter-spacing: 1px !important

  .nav-btn
    font-size: 0.75rem !important
    padding: 4px 6px !important

@include breakpoints.mobile-portrait
  .header
    height: 60px

  .page-container
    padding: 12px

@include breakpoints.mobile-landscape
  .header
    height: 50px

@include breakpoints.media(telegram-tablet, down)
  .header
    background: rgba(var(--color-dark), 0.95)
    backdrop-filter: blur(20px)

  .page-container
    padding-bottom: calc(16px + #{breakpoints.$telegram-bottom-bar})

@include breakpoints.retina
  .header
    border-width: 0.5px

  .brand-title
    text-shadow: 0 0 15px rgba(var(--cyber-glow-rgb), 0.4)

@supports (height: 100dvh)
  .mobile-layout
    min-height: 100dvh

  .page-container
    min-height: calc(100dvh - 70px)

</style>
