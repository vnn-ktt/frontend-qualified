<script setup lang="ts">
import { useRouter } from 'vue-router'
import {
  Trophy, 
  Clock, 
  SuccessFilled,
  Cpu,
  Grid,
  Rank,
  TrendCharts,
  ArrowRight
} from '@element-plus/icons-vue'
import Background from '@/components/animated/Background.vue'

const router = useRouter()

const startTraining = () => {
  router.push('/login')
}

const features = [
  {
    icon: Cpu,
    title: 'AI-Powered Learning',
    description: 'Get personalized challenges and instant code feedback from our intelligent AI mentor',
    color: 'var(--color-primary)'
  },
  {
    icon: Rank,
    title: 'Gamified Progress',
    description: 'Earn badges, level up, and compete on the global leaderboard',
    color: 'var(--color-accent)'
  },
  {
    icon: TrendCharts,
    title: 'Track Growth',
    description: 'Detailed analytics and progress tracking to visualize your improvement',
    color: 'var(--color-info)'
  },
  {
    icon: Clock,
    title: 'Flexible Schedule',
    description: 'Learn at your own pace with bite-sized lessons and challenges',
    color: 'var(--color-warning)'
  }
]
</script>

<template>
  <div class="landing-page">
    <Background />
    
    <div class="landing-container">

      <div class="hero-section">
        <div class="hero-content">
          <div class="badge">
            <el-icon><SuccessFilled /></el-icon>
            <span>Trusted by 10,000+ developers</span>
          </div>
          
          <h1 class="hero-title">
            Level Up Your 
            <span class="gradient-text">Coding Skills</span>
          </h1>
          
          <p class="hero-subtitle">
            The interactive platform where you learn by testing, 
            get AI-powered feedback, and join a community of passionate developers.
          </p>
          
          <div class="hero-actions">
            <el-button 
              type="primary" 
              size="large" 
              @click="startTraining"
              class="cta-button"
            >
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
      </div>

      <div class="feature-section">
        <div class="section-header">
          <h2 class="section-title">Why Choose <span class="accent-text">Qualified</span>?</h2>
          <p class="section-subtitle">We're redefining how developers level up their skills</p>
        </div>
        
        <div class="feature-grid">
          <el-card 
            v-for="(feature, index) in features" 
            :key="index"
            class="feature-card"
            :style="`--feature-color: ${feature.color}`"
          >
            <div class="feature-icon">
              <component :is="feature.icon" />
            </div>
            <h4 class="feature-title">{{ feature.title }}</h4>
            <p class="feature-description">{{ feature.description }}</p>
          </el-card>
        </div>
      </div>

    
    </div>
  </div>
</template>

<style lang="sass" scoped>
.landing-page
  min-height: 100vh
  position: relative
  overflow-x: hidden

.landing-container
  position: relative
  z-index: 1
  max-width: 1400px
  margin: 0 auto
  padding: 2rem 2rem 4rem

.hero-section
  text-align: center
  padding: 4rem 1rem
  margin-bottom: 4rem

.badge
  display: inline-flex
  align-items: center
  gap: 0.5rem
  background: rgba(var(--color-primary-rgb), 0.1)
  color: var(--color-primary)
  padding: 0.5rem 1rem
  border-radius: 2rem
  font-size: 0.875rem
  font-weight: 500
  margin-bottom: 2rem
  
  .el-icon
    font-size: 1rem

.hero-title
  font-size: 3.5rem
  font-weight: 800
  line-height: 1.2
  margin-bottom: 1.5rem
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-clip: text

.gradient-text
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-clip: text
  display: inline-block

.hero-subtitle
  font-size: 1.25rem
  color: var(--color-text-secondary)
  max-width: 700px
  margin: 0 auto 2.5rem
  line-height: 1.6

.hero-actions
  display: flex
  gap: 1rem
  justify-content: center
  margin-bottom: 4rem

  .cta-button
    padding: 1rem 2rem
    font-size: 1.125rem
    font-weight: 600
    
    .el-icon
      margin-left: 0.5rem
      transition: transform 0.3s ease
    
    &:hover .el-icon
      transform: translateX(4px)

  .secondary-button
    padding: 1rem 2rem
    border-color: var(--cyber-border)
    color: var(--color-primary)

.hero-stats
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: center
  align-items: center
  gap: 5rem

.stat
  text-align: center
  
  h3
    font-size: 2.5rem
    font-weight: 800
    color: var(--color-primary)
    margin-bottom: 0.5rem
  
  p
    color: var(--color-text-secondary)
    font-size: 0.875rem

.stat-divider
  width: 1px
  height: 40px
  background: var(--cyber-border)
  opacity: 0.3

// Features Section
.section-header
  text-align: center
  margin-bottom: 3rem

.section-title
  font-size: 2.5rem
  font-weight: 700
  margin-bottom: 1rem

.accent-text
  color: var(--color-primary)

.section-subtitle
  color: var(--color-text-secondary)
  font-size: 1.125rem

.feature-grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))
  gap: 2rem
  margin-bottom: 4rem

.feature-card
  height: 100%
  border: 1px solid var(--cyber-border)
  background: var(--cyber-bg-card)
  transition: all 0.3s ease
  position: relative
  overflow: hidden
  
  &:hover
    transform: translateY(-8px)
    box-shadow: 0 10px 30px rgba(var(--cyber-glow-rgb), 0.2)
    border-color: var(--color-primary)
    
    .feature-arrow
      opacity: 1
      transform: translateX(0)

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
      color: var(--feature-color)

  .feature-title
    font-size: 1.25rem
    font-weight: 600
    margin-bottom: 1rem
    color: var(--color-text-primary)

  .feature-description
    color: var(--color-text-secondary)
    line-height: 1.6
    margin-bottom: 1.5rem

  .feature-arrow
    opacity: 0
    transform: translateX(-10px)
    transition: all 0.3s ease
    color: var(--feature-color)

@media (max-width: 768px)
  .hero-title
    font-size: 2.5rem
  
  .hero-subtitle
    font-size: 1.125rem
  
  .hero-actions
    flex-direction: column
    align-items: center
    
    .cta-button,
    .secondary-button
      width: 100%
      max-width: 300px
  
  .hero-stats
    gap: 2rem
  
  .stat-divider
    display: none
  
  .feature-grid
    grid-template-columns: 1fr

@media (max-width: 480px)
  .landing-container
    padding: 1rem
    
  .hero-title
    font-size: 2rem
  
  .section-title
    font-size: 2rem
</style>