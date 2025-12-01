<script setup lang="ts">
import { ref } from 'vue'
import { useQuasar } from "quasar"
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const $q = useQuasar()
const isDark = ref($q.dark.isActive)
const router = useRouter()

const toggleDarkMode = () => $q.dark.set(isDark.value)

const goHome = () => router.push('/')
const goAbout = () => router.push('/about')
const goSettings = () => router.push('/settings')
</script>
<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-transparent q-pa-none q-pl-none q-pr-none">
      <div class="cyber-header">
        <div class="left-side">
          <q-btn
              flat
              dense
              icon="menu"
              size="sm"
              class="menu-btn"
              @click="leftDrawerOpen = !leftDrawerOpen"
          />

          <div class="brand">
            <span class="brand-title">QUALIFIED</span>
          </div>
        </div>
        <div class="right-side">
          <q-btn flat size="sm" class="nav-btn" @click="goHome">Home</q-btn>
          <q-btn flat size="sm" class="nav-btn" @click="goAbout">Docs</q-btn>
          <q-btn flat size="sm" class="nav-btn" @click="goSettings">About</q-btn>

          <!-- DARK MODE -->
          <q-toggle
              v-model="isDark"
              color="cyan"
              dense
              class="dark-toggle"
              @update:model-value="toggleDarkMode"
          />
        </div>
      </div>
    </q-header>
    <q-drawer
        v-model="leftDrawerOpen"
        side="left"
        overlay
        behavior="mobile"
        class="bg-dark text-white"
    >
      <q-list>
        <q-item clickable v-ripple @click="goHome">
          <q-item-section avatar><q-icon name="home" /></q-item-section>
          <q-item-section>hometown</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goAbout">
          <q-item-section avatar><q-icon name="info" /></q-item-section>
          <q-item-section>about</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goSettings">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="scss" scoped>

.cyber-header {
  width: 100%;
  height: 70px;
  backdrop-filter: blur(15px);
  background: rgba(10, 20, 40, 0.35);
  border-bottom: 1px solid rgba(0, 255, 255, 0.25);
  box-shadow: 0 0 20px rgba(0,255,255,0.25);
  position: relative;

  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 0 20px;
  overflow: hidden;
}

// SCAN LINE
.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(0,255,255,0.6), transparent);
  filter: blur(1px);
}

.left-side {
  display: flex;
  align-items: center;
  gap: 16px;
}

.menu-btn {
  color: cyan;
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-dot {
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: cyan;
  box-shadow: 0 0 12px cyan;
  animation: pulse 1.6s infinite alternate;
}


// RIGHT SIDE
.right-side {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-btn {
  color: #89faff;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.85rem;

  &:hover {
    color: #c8ffff;
    text-shadow: 0 0 8px cyan;
  }
}

.dark-toggle {
  transform: scale(0.85);
}

</style>