<script setup lang="ts">
import { ref, computed, watch, provide, onMounted } from 'vue'
import { useStorage } from "@vueuse/core"
import { useDark, useToggle } from '@vueuse/core'
import type { TTheme } from '@/types/theme'
import { ElConfigProvider } from 'element-plus'
import MobileLayout from '@/layouts/MobileLayout.vue'
import { useRoute, useRouter } from 'vue-router'

//Element-UI config
const size = ref<'default' | 'small' | 'large'>('default')
const zIndex = ref(3000)
const namespace = ref('el')

//Route
const route = useRoute()
const router = useRouter()
const isAuthed = "no"
const isLandingPage = computed(() => route.path === '/landing')

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

watch([isAuthed, () => route.path], ([auth, path]) => {
  if (!auth && path !== '/landing') {
    console.log('user is not authed')
    router.push('/landing')
  } else if (auth && path === '/landing') {
    router.push('/')
  }
}, { immediate: true })

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
      <template v-if="isLandingPage">
        <RouterView />
      </template>
      
      <template v-else>
        <MobileLayout 
          :is-dark-theme="isDarkTheme" 
          @toggle-theme="toggleTheme"
        >
          <RouterView />
        </MobileLayout>
      </template>
    </ElConfigProvider>
  </div>
</template>