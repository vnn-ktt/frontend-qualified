<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg)] text-[var(--color-text)] transition-colors">
    <q-card class="p-4 w-80">
      <h2 class="text-xl font-bold mb-4">Тест тем</h2>
      <q-btn color="primary" label="Primary button" class="mb-4" />
      <q-btn color="secondary" label="Secondary" />
      <div class="mt-4">
        <q-toggle v-model="isDark" label="Тёмная тема" @update:model-value="toggleTheme" />
      </div>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { useTheme } from '@/composables/useTheme'

const { isDark, toggleTheme } = useTheme()
</script>
