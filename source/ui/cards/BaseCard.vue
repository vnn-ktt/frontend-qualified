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
  <div class="feature-card">
    <div class="feature-icon" :style="{ color: color || 'var(--color-primary)' }">
      <component :is="icon" />
    </div>
    <h4 class="feature-title">{{ title }}</h4>
    <p class="feature-description">{{ description }}</p>
  </div>
</template>

<style lang="sass" scoped>
@use '@/assets/styles/components' as *

.feature-card
  background: var(--cyber-bg-card)
  border: 1px solid var(--cyber-border)
  border-radius: 16px
  display: flex
  flex-direction: column
  align-items: center
  text-align: center
  padding: 2rem
  transition: all 0.3s ease
  cursor: default
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1)

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
