<script setup lang="ts">
import { ref, computed, watch, provide, onMounted } from 'vue'
import { useStorage } from "@vueuse/core"
import { useDark, useToggle } from '@vueuse/core'
import type { TTheme } from '@/types/theme'
import { ElConfigProvider } from 'element-plus'
import MobileLayout from '@/layouts/MobileLayout.vue'

//Element-UI config
const size = ref<'default' | 'small' | 'large'>('default')
const zIndex = ref(3000)
const namespace = ref('el')

//Theming
const defaultGuiSettings = {
  THEME: "theme--light" as TTheme
}

const GUI_SETTINGS = useStorage('GUI_SETTINGS', defaultGuiSettings)

const currentTheme = computed(() => GUI_SETTINGS.value.THEME)

const isDarkTheme = useDark({
  selector: 'body',
  attribute: 'class',
  valueDark: 'theme--dark',
  valueLight: 'theme--light',
  storageKey: null,
})

const toggleTheme = useToggle(isDarkTheme)

watch(isDarkTheme, (dark) => {
  const theme: TTheme = dark ? 'theme--dark' : 'theme--light'
  GUI_SETTINGS.value.THEME = theme
}, { immediate: true })

onMounted(() => {
  if (GUI_SETTINGS.value.THEME === 'theme--dark') {
    isDarkTheme.value = true
  }
})

provide('app-theme', {
  isDarkTheme,
  toggleTheme,
  currentTheme
})
</script>

<template>
  <div id="app">
    <ElConfigProvider :size="size" :z-index="zIndex" :namespace="namespace">
      <MobileLayout 
        :is-dark-theme="isDarkTheme" 
        @toggle-theme="toggleTheme"
      >
        <RouterView />
      </MobileLayout>
    </ElConfigProvider>
  </div>
</template>