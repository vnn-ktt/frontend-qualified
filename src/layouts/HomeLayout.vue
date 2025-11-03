<template>
  <q-layout view="hHh lpR fFf">
    <!-- HEADER -->
    <q-header elevated class="bg-dark text-white">
      <q-toolbar>
        <q-btn
            flat
            dense
            round
            icon="menu"
            size="sm"
            @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-toolbar-title class="text-uppercase text-weight-bold">
          qualified
        </q-toolbar-title>
        <q-toggle
          v-model="isDark"
          label="dark"
          color="secondary"
          dense
          @update:model-value="toggleDarkMode"
        />
      </q-toolbar>
    </q-header>

    <!-- DRAWER (MENU) -->
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
          <q-item-section>Home</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goAbout">
          <q-item-section avatar><q-icon name="info" /></q-item-section>
          <q-item-section>About</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="goSettings">
          <q-item-section avatar><q-icon name="settings" /></q-item-section>
          <q-item-section>Settings</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <!-- MAIN PAGE CONTENT -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {useQuasar} from "quasar";
import { useRouter } from 'vue-router'

const leftDrawerOpen = ref(false)
const $q = useQuasar()
const isDark = ref($q.dark.isActive)
const router = useRouter()

const toggleDarkMode = () => {
  isDark.value = !isDark.value
  $q.dark.set(isDark.value)
}
const goHome = () => router.push('/')
const goAbout = () => router.push('/about')
const goSettings = () => router.push('/settings')
</script>