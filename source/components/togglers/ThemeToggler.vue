<script setup lang="ts">
import { inject, ref } from 'vue'

const themeContext = inject('app-theme') as {
  isDarkTheme: { value: boolean }
  toggleTheme: () => void
  currentTheme: { value: string }
}

const { isDarkTheme, toggleTheme } = themeContext

const tooltipText = ref('')

const updateTooltip = () => {
  tooltipText.value = isDarkTheme.value ? 'Switch to Light' : 'Switch to Dark'
}

const handleToggle = () => {
  toggleTheme()
  updateTooltip()
}
</script>

<template>
  <Tooltip :text="isDarkTheme ? 'Switch to Light' : 'Switch to Dark'">
    <button
      class="theme-btn"
      @click="handleToggle"
      :title="isDarkTheme ? 'Switch to Light' : 'Switch to Dark'"
    >
      <i :class="isDarkTheme ? 'pi pi-sun' : 'pi pi-moon'"></i>
    </button>
  </Tooltip>
</template>

<style lang="scss" scoped>
.theme-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: transparent;
  border: 1px solid var(--cyber-border);
  color: var(--cyber-glow);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  font-size: 1rem;

  &:hover {
    background: rgba(var(--cyber-glow-rgb), 0.1);
    border-color: var(--cyber-glow);
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  i {
    font-size: 1rem;
  }
}
</style>