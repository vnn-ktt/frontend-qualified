<script setup lang="ts">
import { Sunny, Moon } from '@element-plus/icons-vue'
import { inject } from 'vue'

const themeContext = inject('app-theme') as {
  isDarkTheme: { value: boolean }
  toggleTheme: () => void
  currentTheme: { value: string }
}

const { isDarkTheme, toggleTheme } = themeContext

</script>

<template>
  <el-tooltip :content="isDarkTheme ? 'Switch to Light' : 'Switch to Dark'">
    <el-button
      :icon="isDarkTheme ? Sunny : Moon"
      circle
      @click="toggleTheme()"
      :type="isDarkTheme ? 'primary' : 'default'"
    />
  </el-tooltip>
</template>