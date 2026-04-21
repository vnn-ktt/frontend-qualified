<template>
  <div class="feature-card">
    <div class="card-icon">
      <component :is="icon" />
    </div>
    <h3 class="card-title">{{ title }}</h3>
    <p class="card-description">{{ description }}</p>
  </div>
</template>

<script setup lang="ts">
import { type Component, defineProps } from 'vue'

defineProps<{
  icon: Component
  title: string
  description: string
}>()
</script>

<style lang="sass" scoped>
.feature-card
  padding: 2rem
  border-radius: 12px
  background: rgba(var(--color-primary-rgb), 0.05)
  border: 1px solid rgba(var(--cyber-glow-rgb), 0.2)
  transition: all 0.3s ease
  text-align: center

  &:hover
    background: rgba(var(--color-primary-rgb), 0.1)
    border-color: rgba(var(--cyber-glow-rgb), 0.4)
    transform: translateY(-4px)
    box-shadow: 0 8px 24px rgba(var(--cyber-glow-rgb), 0.15)

.card-icon
  font-size: 2.5rem
  color: var(--color-primary)
  margin-bottom: 1rem

.card-title
  font-size: 1.25rem
  font-weight: 700
  margin-bottom: 0.75rem
  color: var(--color-text-primary)

.card-description
  font-size: 0.95rem
  color: var(--color-text-secondary)
  line-height: 1.6
</style>
