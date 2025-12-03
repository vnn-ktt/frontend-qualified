<script setup lang="ts">
import { computed, watch, provide } from 'vue'
import { useQuasar } from "quasar"
import { useStorage } from "@vueuse/core"
import { TTheme } from '@/types/theme'
import TelegramLayout from "@/layouts/TelegramLayout.vue"
import HomePage from '@/pages/HomePage.vue'

const $q = useQuasar()
const defaultGuiSettings = {
  THEME: ($q.dark.isActive ? "dark" : "light") as TTheme
}

const GUI_SETTINGS = useStorage('GUI_SETTINGS', defaultGuiSettings)

const isDarkTheme = computed({
  get: () => GUI_SETTINGS.value.THEME === "dark",
  set: (isDark: boolean) => {
    const theme: TTheme = isDark ? "dark" : "light"
    setTheme(theme)
  }
})

const setTheme = (theme: TTheme) => {
  const isDark = theme === "dark"
  $q.dark.set(isDark)
  GUI_SETTINGS.value.THEME = theme
}

watch(
    () => GUI_SETTINGS.value.THEME,
    (theme: TTheme) => {
      $q.dark.set(theme === "dark")
    },
    { immediate: true }
)

provide('app-theme', {
  isDarkTheme,
  setTheme,
  currentTheme: computed(() => GUI_SETTINGS.value.THEME)
})
</script>

<template>
  <TelegramLayout :is-dark-theme="isDarkTheme" @toggle-theme="isDarkTheme = !isDarkTheme">
    <HomePage />
  </TelegramLayout>
</template>