<script setup lang="ts">
import HomePage from '@/pages/HomePage.vue'
import MainLayout from "@/layouts/MainLayout.vue"
import { useThemeStore } from '@/stores/guiStore'
import { onMounted } from 'vue'

const themeStore = useThemeStore()
onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <MainLayout>
    <HomePage />
  </MainLayout>
</template>