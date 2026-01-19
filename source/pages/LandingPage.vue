<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  Clock, SuccessFilled, Cpu, Rank, TrendCharts, ArrowRight
} from '@element-plus/icons-vue'
import Background from '@/components/animated/Background.vue'
import FeatureCard from '@/components/cards/FeatureCard.vue'
import type { Component } from 'vue'

type TFeature = {
  icon: Component,
  title: string,
  description: string
}

const router = useRouter()

const features: Array<TFeature> = [
  { icon: Cpu, title: 'AI-Powered Learning', description: 'Get personalized challenges and instant code feedback from our intelligent AI mentor' },
  { icon: Rank, title: 'Gamified Progress', description: 'Earn badges, level up, and compete on the global leaderboard' },
  { icon: TrendCharts, title: 'Track Growth', description: 'Detailed analytics and progress tracking to visualize your improvement' },
  { icon: Clock, title: 'Flexible Schedule', description: 'Learn at your own pace with bite-sized lessons and challenges' }
]
</script>

<template>
  <div class="landing-page">
    <Background />

    <div class="landing-container">

      <!-- Hero -->
      <section class="hero-section">
        <div class="hero-content">

          <h1 class="hero-title">
            Level Up Your <span class="gradient-heading-text">Coding Skills</span>
          </h1>
          <p class="hero-subtitle">
            Interactive platform to test, learn, and get AI feedback in a community of passionate developers.
          </p>

          <div class="hero-actions">
            <el-button type="primary" size="large" @click="router.push('/login')" class="cta-button">
              Start
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </div>

          <div class="hero-stats">
            <div class="stat">
              <h3>50,000+</h3>
              <p>Challenges Completed</p>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <h3>2,500+</h3>
              <p>Real Projects Built</p>
            </div>
            <div class="stat-divider"></div>
            <div class="stat">
              <h3>98%</h3>
              <p>Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Features -->
      <section class="feature-section">
        <div class="section-header">
          <h2 class="section-title">Why Choose <span class="accent-text">Qualified</span>?</h2>
        </div>

        <div class="feature-grid">
          <FeatureCard
            v-for="(feature, idx) in features"
            :key="idx"
            :icon="feature.icon"
            :title="feature.title"
            :description="feature.description"
          />
        </div>
      </section>

    </div>
  </div>
</template>

<style lang="sass" scoped>
@use '@/assets/styles/components' as *

.landing-page
  min-height: 100vh
  width: 100%
  display: flex
  flex-direction: column
  background: var(--cyber-bg-primary)
  position: relative
  overflow-x: hidden

.landing-container
  flex: 1
  max-width: 1400px
  width: 100%
  margin: 0 auto
  padding: 2rem
  display: flex
  flex-direction: column
  justify-content: center

.hero-section
  flex: 1
  display: flex
  flex-direction: column
  justify-content: center
  text-align: center
  padding: 2rem 1rem
  gap: 2rem

.hero-title
  @include gradients.gradient-heading-text
  font-size: 3.5rem
  font-weight: 800
  line-height: 1.2
  margin-bottom: 1rem

.hero-subtitle
  font-size: 1.25rem
  color: var(--color-text-secondary)
  max-width: 700px
  margin: 0 auto 2rem
  line-height: 1.6

.hero-actions
  display: flex
  justify-content: center
  gap: 1rem
  margin-bottom: 3rem

  .cta-button
    padding: 1rem 2rem
    font-size: 1.125rem
    font-weight: 600

    .el-icon
      margin-left: 0.5rem
      transition: transform 0.3s ease

    &:hover .el-icon
      transform: translateX(4px)

.hero-stats
  display: flex
  justify-content: center
  align-items: center
  gap: 4rem
  flex-wrap: wrap

.stat
  text-align: center

  h3
    font-size: 2rem
    font-weight: 800
    color: var(--color-primary)

  p
    font-size: 0.875rem
    color: var(--color-text-secondary)

.stat-divider
  width: 1px
  height: 40px
  background: var(--cyber-border)
  opacity: 0.3

.feature-section
  display: flex
  flex-direction: column
  gap: 1rem

.section-header
  text-align: center
  margin-bottom: 2rem

.section-title
  font-size: 2.5rem
  font-weight: 700
  margin-bottom: 0.5rem

.accent-text
  color: var(--color-primary)

.section-subtitle
  font-size: 1.125rem
  color: var(--color-text-secondary)

.feature-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))
  gap: 2rem

@media (max-width: 768px)
  .hero-title
    font-size: 2.5rem

  .hero-subtitle
    font-size: 1.125rem

  .hero-actions
    flex-direction: column
    align-items: center

    .cta-button
      width: 100%
      max-width: 300px

  .hero-stats
    gap: 2rem

  .stat-divider
    display: none

@media (max-width: 480px)
  .landing-container
    padding: 1rem

  .hero-title
    font-size: 2rem

  .section-title
    font-size: 2rem
</style>