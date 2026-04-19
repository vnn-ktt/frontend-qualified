<template>
  <button class="theme-toggler" @click="emit('toggle-theme')" :title="isDarkTheme ? 'Light mode' : 'Dark mode'">
    <i :class="isDarkTheme ? 'pi pi-sun' : 'pi pi-moon'"></i>
  </button>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'

defineProps<{
  isDarkTheme: boolean
}>()

const emit = defineEmits<{
  'toggle-theme': []
}>()
</script>

<style lang="sass" scoped>
.theme-toggler
  background: rgba(var(--color-primary-rgb), 0.1)
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.2)
  border-radius: 6px
  padding: 6px 10px
  cursor: pointer
  transition: all 0.3s ease
  color: var(--cyber-glow)
  font-size: 1.1rem

  &:hover
    background: rgba(var(--color-primary-rgb), 0.2)
    border-color: rgba(var(--cyber-glow-rgb), 0.4)
    transform: scale(1.05)
</style>
