<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import IconShuttle from "@/components/icons/IconShuttle.vue";

defineProps<{
  isDarkTheme: boolean
}>()

const emit = defineEmits<{
  'toggle-theme': []
}>()
const router = useRouter()
const leftDrawerOpen = ref(false)
const toggleTheme = () => {
  emit('toggle-theme')
}
const goHome = () => router.push('/')
const goAbout = () => router.push('/about')
const goSettings = () => router.push('/settings')
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent q-pa-none q-pl-none q-pr-none">
      <div class="cyber-header">
        <div class="scan-line"></div>
        <div class="left-side">
          <q-btn padding="0" class="brand" @click="goHome">
            <IconShuttle />
            <span class="brand-title">QUALIFIED</span>
          </q-btn>
        </div>
        <div class="right-side">
          <q-btn flat size="sm" class="nav-btn" @click="goAbout">Docs</q-btn>
          <q-btn flat size="sm" class="nav-btn" @click="goSettings">About</q-btn>
          <q-toggle :model-value="isDarkTheme" dense class="q-toggle--dark" @update:model-value="toggleTheme"/>
        </div>
      </div>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="sass" scoped>
.cyber-header
  width: 100%
  height: 70px
  backdrop-filter: blur(15px)
  background: rgba(10, 20, 40, 0.35)
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
  color: cyan
  &:hover
    color: #c8ffff
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
  color: var(--cyber-text)
  font-weight: 700
  letter-spacing: 3px
  text-shadow: 0 0 10px rgba(0, 255, 255, 0.3)

.right-side
  display: flex
  align-items: center

.nav-btn
  text-transform: uppercase
  letter-spacing: 1px
  font-size: 0.85rem

  &:hover
    color: #c8ffff
    text-shadow: 0 0 8px cyan
    transform: translateY(-1px)


@keyframes scan
  0%
    transform: translateX(-100%)
  100%
    transform: translateX(100%)
@keyframes float
  0%, 100%
    transform: translateY(0) rotate(0deg)
  50%
    transform: translateY(-5px) rotate(1deg)
@keyframes shine
  0%
    background-position: 0 center
  100%
    background-position: 200% center
@keyframes pulse
  0%
    filter: drop-shadow(0 0 6px rgba(0, 255, 255, 0.7))
  100%
    filter: drop-shadow(0 0 15px cyan) drop-shadow(0 0 25px cyan)
</style>