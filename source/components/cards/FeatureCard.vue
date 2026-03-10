<script setup lang="ts">
import type { Component } from 'vue'
defineProps<{
  icon: Component,
  title: string,
  description: string,
  color?: string
}>()
</script>

<template>
  <el-card class="feature-card">
    <div class="feature-icon" :style="{ color: color || 'var(--color-primary)' }">
      <component :is="icon" />
    </div>
    <h4 class="feature-title">{{ title }}</h4>
    <p class="feature-description">{{ description }}</p>
  </el-card>
</template>

<style lang="sass" scoped>
@use '@/assets/styles/components' as *

.feature-card
  @extend .cyber-card
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  padding: 2rem
  transition: all 0.3s ease
  cursor: default

  &:hover
    transform: translateY(-8px)
    box-shadow: 0 10px 30px rgba(var(--cyber-glow-rgb), 0.2)
    border-color: var(--color-primary)

  .feature-icon
    width: 60px
    height: 60px
    border-radius: 12px
    background: rgba(var(--cyber-glow-rgb), 0.1)
    display: flex
    align-items: center
    justify-content: center
    margin-bottom: 1.5rem

    .el-icon
      font-size: 2rem

  .feature-title
    font-size: 1.25rem
    font-weight: 600
    margin-bottom: 1rem
    color: var(--color-text-primary)

  .feature-description
    font-size: 0.95rem
    color: var(--color-text-secondary)
    line-height: 1.6
</style>
