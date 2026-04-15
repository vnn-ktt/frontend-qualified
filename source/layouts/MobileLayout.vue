<template>
  <div class="mobile-layout">
    <header class="header scan-horizontal">
      <div class="header-content">
        <!-- Левый блок -->
        <div class="left-side">
          <button class="brand-btn" @click="goHome">
            <span class="brand-title">qualified</span>
          </button>
        </div>

        <!-- Правый блок -->
        <div class="right-side">
          <!-- Дополнительное меню появляется на планшетах -->
          <div class="desktop-nav">
            <button class="nav-btn" @click="goAbout">
              Documentation
            </button>
            <button class="nav-btn" @click="goSettings">
              About
            </button>
          </div>

          <ThemeToggler
            :is-dark-theme="isDarkTheme"
            @toggle-theme="toggleTheme"
            class="theme-toggle"
          />

          <!-- Мобильное меню -->
          <Dropdown class="mobile-menu" :model="menuOpen" @show="menuOpen = true" @hide="menuOpen = false">
            <template #default="{ toggleMenu }">
              <button class="menu-btn" @click="toggleMenu">
                <i class="pi pi-ellipsis-v"></i>
              </button>
            </template>
            <template #content>
              <ul class="menu-list">
                <li><a href="#" @click.prevent="handleMenuClick(goAbout)">
                  <i class="pi pi-file"></i> Documentation
                </a></li>
                <li><a href="#" @click.prevent="handleMenuClick(goSettings)">
                  <i class="pi pi-info-circle"></i> About
                </a></li>
                <li class="divider"></li>
                <li><a href="#" @click.prevent="handleMenuClick(toggleTheme)">
                  <i class="pi pi-moon"></i> Toggle Theme
                </a></li>
              </ul>
            </template>
          </Dropdown>
        </div>
      </div>
    </header>

    <main class="page-container">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import ThemeToggler from '@/components/togglers/ThemeToggler.vue'

defineProps<{
  isDarkTheme: boolean
}>()

const emit = defineEmits<{
  'toggle-theme': []
}>()

const router = useRouter()
const menuOpen = ref(false)

const toggleTheme = () => {
  emit('toggle-theme')
  menuOpen.value = false
}

const goHome = () => {
  router.push('/')
  menuOpen.value = false
}
const goAbout = () => {
  router.push('/about')
  menuOpen.value = false
}
const goSettings = () => {
  router.push('/settings')
  menuOpen.value = false
}

const handleMenuClick = (callback: () => void) => {
  callback()
  menuOpen.value = false
}
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
    cursor: pointer
    color: var(--color-text-primary)
    font-family: inherit
    font-size: 1rem

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
      background: transparent
      border: none
      cursor: pointer
      padding: 6px
      font-size: 1.2rem

      &:hover
        color: var(--color-text-primary)
        background: rgba(var(--cyber-glow-rgb), 0.1)
        border-radius: 6px

    :deep(.menu-list)
      list-style: none
      margin: 0
      padding: 8px 0
      background: var(--cyber-bg-card)
      border: 1px solid var(--cyber-border)
      border-radius: 8px
      min-width: 160px

      li
        &.divider
          height: 1px
          background: var(--cyber-border)
          margin: 4px 0

        a
          display: flex
          align-items: center
          gap: 8px
          padding: 10px 16px
          color: var(--cyber-glow)
          text-decoration: none
          transition: all 0.3s ease

          i
            font-size: 0.9rem

          &:hover
            background: rgba(var(--cyber-glow-rgb), 0.1)
            color: var(--color-accent)

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
  background: transparent
  border: none
  cursor: pointer
  color: var(--color-text-primary)
  font-family: inherit

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
