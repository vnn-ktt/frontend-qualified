<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import Background from '@/components/animated/Background.vue'

const router = useRouter()
const isTyping = ref(false)

const technologies = ref([
  {
    name: 'JavaScript',
    icon: '{}',
    iconClass: 'js-glow',
    status: 'ACTIVE',
    statusClass: 'status-online',
    description: 'ES2023',
    level: 95
  },
  {
    name: 'TypeScript',
    icon: '👩‍💻',
    iconClass: 'python-glow',
    status: 'ACTIVE',
    statusClass: 'status-online',
    description: 'AI/ML Ready',
    level: 88
  },
  {
    name: 'Vue.js',
    icon: '🌲',
    iconClass: 'vue-glow',
    status: 'ACTIVE',
    statusClass: 'status-active',
    description: 'Vue 3',
    level: 92
  },
  {
    name: 'Nest.js',
    icon: '🦁',
    iconClass: 'quasar-glow',
    status: 'ACTIVE',
    statusClass: 'status-ready',
    description: 'Cross-platform',
    level: 90
  }
])

const stats = ref([
  {
    value: '150+',
    label: 'Questions',
    color: 'cyan',
    icon: '📝'
  },
  {
    value: '4',
    label: 'Tech',
    color: 'blue',
    icon: '💻'
  },
  {
    value: '∞',
    label: 'Challenges',
    color: 'purple',
    icon: '🏆'
  }
])

const startQuiz = () => {
  const btn = document.querySelector('.cta-btn')
  btn?.classList.add('btn-activate')

  // Мобильный эффект вибрации
  if ('vibrate' in navigator) {
    navigator.vibrate([50, 30, 50])
  }

  setTimeout(() => {
    router.push('/quiz')
  }, 600)
}

onMounted(() => {
  setTimeout(() => {
    isTyping.value = true
  }, 500)
  setTimeout(() => {
    document.querySelectorAll('.tech-card').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('loaded')
      }, index * 150)
    })
  }, 800)
  setTimeout(() => {
    document.querySelectorAll('.stats-card').forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('visible')
      }, index * 100)
    })
  }, 400)
})
</script>
<template>
  <q-page class="home-page">
    <Background />
    <div class="content-wrapper">

      <!-- Hero Section -->
      <div class="hero-section">
        <div class="title-container">
          <h1 class="main-title">Q<span class="highlight">Bot</span></h1>
          <div class="title-subtext">
            <span class="terminal-blink">▶</span> Neural Network Active
          </div>
        </div>

        <!-- Mobile Terminal -->
        <div class="mobile-terminal">
          <div class="terminal-line">
            <span class="prompt">$</span> system ready
          </div>
          <div class="terminal-line typing" :class="{ 'active': isTyping }">
            <span class="prompt">$</span> awaiting input...
          </div>
          <div class="cursor-line">
            <span class="cursor">█</span>
          </div>
        </div>
      </div>

      <!-- Quick Stats -->
      <div class="mobile-stats">
        <div
            class="stat-item"
            v-for="stat in stats"
            :key="stat.label"
            :class="`stat-${stat.color}`"
        >
          <div class="stat-icon">{{ stat.icon }}</div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-label">{{ stat.label }}</div>
        </div>
      </div>

      <!-- Main CTA -->
      <div class="mobile-cta">
        <button
            class="cta-btn"
            @click="startQuiz"
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
        >
          <span class="btn-icon">🚀</span>
          <span class="btn-text">Start Quiz</span>
          <span class="btn-arrow">→</span>
        </button>

        <div class="cta-subtext">
          Test your skills in programming
        </div>
      </div>

      <!-- Technologies Swiper -->
      <div class="tech-section">
        <h2 class="section-title">
          <span class="title-icon">💻</span>
          Technologies
        </h2>

        <div class="tech-swiper">
          <div
              class="tech-card-swipe"
              v-for="tech in technologies"
              :key="tech.name"
              :class="[tech.iconClass, 'swipe-item']"
          >
            <div class="tech-card-content">
              <div class="tech-icon">{{ tech.icon }}</div>
              <div class="tech-info">
                <div class="tech-name">{{ tech.name }}</div>
                <div class="tech-status">
                  <span class="status-indicator" :class="tech.statusClass"></span>
                  {{ tech.status }}
                </div>
              </div>
              <div class="tech-progress">
                <div class="progress-bar">
                  <div
                      class="progress-fill"
                      :style="{ width: tech.level + '%' }"
                  ></div>
                </div>
                <span class="progress-value">{{ tech.level }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Features -->
      <div class="features-section">
        <div class="feature-card">
          <div class="feature-icon">🤖</div>
          <h3 class="feature-title">AI Powered</h3>
          <p class="feature-desc">Smart question generation</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">⚡</div>
          <h3 class="feature-title">Fast</h3>
          <p class="feature-desc">Real-time feedback</p>
        </div>

        <div class="feature-card">
          <div class="feature-icon">🎮</div>
          <h3 class="feature-title">Fun</h3>
          <p class="feature-desc">Gamified experience</p>
        </div>
      </div>

      <!-- Mobile Footer -->
      <div class="mobile-footer">
        <div class="footer-links">
          <button class="footer-link">
            <span class="link-icon">📚</span>
            Docs
          </button>
          <button class="footer-link">
            <span class="link-icon">⭐</span>
            Rate
          </button>
          <button class="footer-link">
            <span class="link-icon">⚙️</span>
            Settings
          </button>
        </div>
        <div class="footer-copyright">
          © 2025 QBot v1.0.0
        </div>
      </div>

    </div>
    <div class="mobile-nav-bar">
      <button class="nav-item active">
        <span class="nav-icon">🏠</span>
        <span class="nav-label">Home</span>
      </button>
      <button class="nav-item" @click="router.push('/quiz')">
        <span class="nav-icon">🎯</span>
        <span class="nav-label">Quiz</span>
      </button>
      <button class="nav-item">
        <span class="nav-icon">📊</span>
        <span class="nav-label">Stats</span>
      </button>
      <button class="nav-item">
        <span class="nav-icon">👤</span>
        <span class="nav-label">Profile</span>
      </button>
    </div>
  </q-page>
</template>
<style lang="sass" scoped>
.home-page
  width: 100%
  min-height: 100vh
  background: radial-gradient(circle at top, rgba(0, 30, 60, 0.95) 0%, rgba(0, 10, 20, 1) 100%)
  position: relative
  overflow-x: hidden
  padding-bottom: 60px // For nav bar

.content-wrapper
  padding: 16px
  max-width: 100%
  overflow-x: hidden

// Mobile Header
.mobile-header
  display: flex
  justify-content: space-between
  align-items: center
  padding: 16px
  padding-top: env(safe-area-inset-top, 16px)
  position: sticky
  top: 0
  z-index: 100
  background: rgba(0, 15, 30, 0.9)
  backdrop-filter: blur(20px)
  border-bottom: 1px solid rgba(0, 255, 255, 0.1)

.mobile-brand
  display: flex
  align-items: center
  gap: 12px

.brand-logo
  font-size: 24px
  animation: logo-pulse 2s infinite

.brand-name
  font-family: 'Orbitron', sans-serif
  font-size: 20px
  font-weight: 700
  background: linear-gradient(90deg, #00ffff, #0080ff)
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-clip: text

.mobile-menu-btn
  width: 40px
  height: 40px
  display: flex
  flex-direction: column
  justify-content: center
  gap: 6px
  padding: 8px
  border-radius: 8px
  background: rgba(0, 255, 255, 0.1)
  border: 1px solid rgba(0, 255, 255, 0.2)

.menu-line
  height: 2px
  background: #00ffff
  border-radius: 1px
  transition: all 0.3s ease

  &:nth-child(1)
    width: 20px
  &:nth-child(2)
    width: 16px
  &:nth-child(3)
    width: 12px

.mobile-menu-btn:active .menu-line
  background: #00ffaa

// Hero Section
.hero-section
  margin: 30px 0 40px

.title-container
  text-align: center
  margin-bottom: 24px

.main-title
  font-family: 'Orbitron', sans-serif
  font-size: 48px
  font-weight: 900
  color: white
  margin-bottom: 8px
  line-height: 1.1

  .highlight
    background: linear-gradient(90deg, #00ffff, #0080ff)
    -webkit-background-clip: text
    -webkit-text-fill-color: transparent
    background-clip: text

.title-subtext
  font-family: 'Courier New', monospace
  font-size: 14px
  color: #00ffff
  display: flex
  align-items: center
  justify-content: center
  gap: 8px

  .terminal-blink
    animation: blink 10000s infinite
    color: #00ff00

// Mobile Terminal
.mobile-terminal
  background: rgba(0, 10, 20, 0.8)
  border: 1px solid rgba(0, 255, 255, 0.2)
  border-radius: 12px
  padding: 16px
  margin: 0 auto
  max-width: 340px
  font-family: 'Courier New', monospace

.terminal-line
  color: #b3c2ff
  font-size: 14px
  margin-bottom: 8px
  line-height: 1.4

  &.typing
    overflow: hidden
    white-space: nowrap
    opacity: 0

    &.active
      animation: typing 2s steps(20) forwards
      opacity: 1

.prompt
  color: #00ff00
  margin-right: 8px

.cursor-line
  margin-top: 8px

.cursor
  color: #00ffff
  animation: blink 1s infinite
  font-size: 16px

// Mobile Stats
.mobile-stats
  display: flex
  justify-content: space-between
  gap: 12px
  margin: 30px 0
  padding: 0 8px

.stat-item
  flex: 1
  background: rgba(0, 20, 40, 0.6)
  border-radius: 12px
  padding: 16px 12px
  text-align: center
  border: 1px solid rgba(255, 255, 255, 0.1)
  transition: all 0.3s ease

  &:active
    transform: scale(0.95)

.stat-icon
  font-size: 24px
  margin-bottom: 8px
  opacity: 0.9

.stat-value
  font-family: 'Orbitron', sans-serif
  font-size: 28px
  font-weight: 700
  margin-bottom: 4px
  line-height: 1

.stat-label
  font-size: 12px
  color: rgba(255, 255, 255, 0.7)
  text-transform: uppercase
  letter-spacing: 1px

.stat-cyan
  color: #00ffff
  border-color: rgba(0, 255, 255, 0.3)
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.1)

.stat-blue
  color: #0080ff
  border-color: rgba(0, 128, 255, 0.3)
  box-shadow: 0 0 20px rgba(0, 128, 255, 0.1)

.stat-purple
  color: #a855f7
  border-color: rgba(168, 85, 247, 0.3)
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.1)

// Mobile CTA
.mobile-cta
  margin: 40px 0

.cta-btn
  width: 100%
  background: linear-gradient(135deg, #0080ff, #00ffff)
  border: none
  border-radius: 16px
  padding: 20px 24px
  display: flex
  align-items: center
  justify-content: center
  gap: 12px
  font-family: 'Orbitron', sans-serif
  font-size: 18px
  font-weight: 700
  color: white
  margin-bottom: 16px
  position: relative
  overflow: hidden
  transition: all 0.3s ease

  &:active
    transform: scale(0.98)
    background: linear-gradient(135deg, #0066cc, #00ccff)

  &::after
    content: ''
    position: absolute
    top: 0
    left: -100%
    width: 100%
    height: 100%
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)
    transition: left 0.5s ease

  &:active::after
    left: 100%

.btn-icon
  font-size: 24px
  animation: rocket-shake 2s infinite

.btn-text
  flex: 1
  text-align: center

.btn-arrow
  font-size: 20px
  animation: arrow-bounce 1s infinite

.cta-subtext
  text-align: center
  color: rgba(255, 255, 255, 0.7)
  font-size: 14px
  font-family: 'Courier New', monospace

// Tech Section
.tech-section
  margin: 40px 0

.section-title
  font-family: 'Orbitron', sans-serif
  font-size: 24px
  color: white
  text-align: center
  margin-bottom: 24px
  display: flex
  align-items: center
  justify-content: center
  gap: 12px

  .title-icon
    font-size: 20px
    animation: icon-spin 3s linear infinite

.tech-swiper
  display: flex
  gap: 16px
  overflow-x: auto
  padding: 8px 4px
  margin: 0 -16px
  padding-left: 16px
  scrollbar-width: none

  &::-webkit-scrollbar
    display: none

.tech-card-swipe
  flex: 0 0 280px
  background: rgba(0, 20, 40, 0.6)
  border-radius: 16px
  padding: 20px
  border: 1px solid rgba(255, 255, 255, 0.1)
  transition: all 0.3s ease

  &:active
    transform: scale(0.97)

.tech-card-content
  display: flex
  align-items: center
  gap: 16px

.tech-icon
  font-size: 36px
  font-weight: bold
  width: 60px
  height: 60px
  display: flex
  align-items: center
  justify-content: center
  border-radius: 12px
  background: rgba(0, 0, 0, 0.3)

.tech-info
  flex: 1

.tech-name
  font-size: 18px
  font-weight: 700
  margin-bottom: 4px
  color: white

.tech-status
  font-size: 12px
  display: flex
  align-items: center
  gap: 6px

.status-indicator
  width: 6px
  height: 6px
  border-radius: 50%
  display: inline-block

.tech-progress
  width: 100%
  margin-top: 12px

.progress-bar
  height: 4px
  background: rgba(255, 255, 255, 0.1)
  border-radius: 2px
  overflow: hidden
  margin-bottom: 6px

.progress-fill
  height: 100%
  border-radius: 2px
  transition: width 1s ease

.progress-value
  font-size: 12px
  color: rgba(255, 255, 255, 0.7)
  text-align: right
  display: block

// Glow colors
.js-glow
  color: #F7DF1E
  border-color: rgba(247, 223, 30, 0.3)

  .progress-fill
    background: #F7DF1E

.python-glow
  color: #3776AB
  border-color: rgba(55, 118, 171, 0.3)

  .progress-fill
    background: #3776AB

.vue-glow
  color: #4FC08D
  border-color: rgba(79, 192, 141, 0.3)

  .progress-fill
    background: #4FC08D

.quasar-glow
  color: #00D4FF
  border-color: rgba(0, 212, 255, 0.3)

  .progress-fill
    background: #00D4FF

// Status colors
.status-online .status-indicator
  background: #00ff00
  animation: status-pulse 2s infinite

.status-active .status-indicator
  background: #00ffff
  animation: status-pulse 1.5s infinite

.status-ready .status-indicator
  background: #0080ff
  animation: status-pulse 2.5s infinite

// Features Section
.features-section
  display: flex
  flex-direction: column
  gap: 16px
  margin: 40px 0

.feature-card
  background: rgba(0, 20, 40, 0.5)
  border-radius: 16px
  padding: 24px
  text-align: center
  border: 1px solid rgba(0, 255, 255, 0.1)
  transition: all 0.3s ease

  &:active
    transform: scale(0.98)
    border-color: rgba(0, 255, 255, 0.3)

.feature-icon
  font-size: 40px
  margin-bottom: 16px

.feature-title
  font-family: 'Orbitron', sans-serif
  font-size: 20px
  color: white
  margin-bottom: 8px

.feature-desc
  font-size: 14px
  color: rgba(255, 255, 255, 0.7)
  line-height: 1.4

// Mobile Footer
.mobile-footer
  margin-top: 40px
  padding-top: 24px
  border-top: 1px solid rgba(255, 255, 255, 0.1)

.footer-links
  display: flex
  justify-content: space-around
  margin-bottom: 20px

.footer-link
  display: flex
  flex-direction: column
  align-items: center
  gap: 6px
  background: none
  border: none
  color: rgba(255, 255, 255, 0.7)
  font-size: 12px
  padding: 8px
  transition: all 0.3s ease

  &:active
    color: #00ffff
    transform: scale(0.9)

  .link-icon
    font-size: 20px

.footer-copyright
  text-align: center
  font-size: 12px
  color: rgba(255, 255, 255, 0.5)
  font-family: 'Courier New', monospace
  padding: 16px 0

// Mobile Navigation Bar
.mobile-nav-bar
  position: fixed
  bottom: 0
  left: 0
  right: 0
  display: flex
  background: rgba(0, 15, 30, 0.95)
  backdrop-filter: blur(20px)
  border-top: 1px solid rgba(0, 255, 255, 0.1)
  padding: 8px 16px
  padding-bottom: calc(8px + env(safe-area-inset-bottom, 0))
  z-index: 1000

.nav-item
  flex: 1
  display: flex
  flex-direction: column
  align-items: center
  gap: 4px
  background: none
  border: none
  color: rgba(255, 255, 255, 0.7)
  padding: 8px
  border-radius: 8px
  transition: all 0.3s ease

  &:active
    background: rgba(0, 255, 255, 0.1)
    color: #00ffff

  &.active
    color: #00ffff

    .nav-icon
      transform: translateY(-4px)

.nav-icon
  font-size: 20px
  transition: transform 0.3s ease

.nav-label
  font-size: 10px
  text-transform: uppercase
  letter-spacing: 0.5px

// Animations
@keyframes logo-pulse
  0%, 100%
    transform: scale(1)
    text-shadow: 0 0 10px rgba(0, 255, 255, 0.5)
  50%
    transform: scale(1.1)
    text-shadow: 0 0 20px rgba(0, 255, 255, 0.8)

@keyframes blink
  0%, 50%
    opacity: 1
  51%, 100%
    opacity: 0

@keyframes typing
  from
    width: 0
  to
    width: 100%

@keyframes rocket-shake
  0%, 100%
    transform: translateY(0) rotate(0)
  25%
    transform: translateY(-2px) rotate(-2deg)
  75%
    transform: translateY(2px) rotate(2deg)

@keyframes arrow-bounce
  0%, 100%
    transform: translateX(0)
  50%
    transform: translateX(4px)

@keyframes icon-spin
  0%
    transform: rotate(0deg)
  100%
    transform: rotate(360deg)

@keyframes status-pulse
  0%, 100%
    opacity: 1
  50%
    opacity: 0.5

// Touch feedback
.touch-feedback
  &:active
    background: rgba(255, 255, 255, 0.1) !important

// Responsive adjustments
@media (max-width: 375px)
  .main-title
    font-size: 42px

  .stat-value
    font-size: 24px

  .tech-card-swipe
    flex: 0 0 260px

  .feature-icon
    font-size: 36px

  .feature-title
    font-size: 18px

@media (max-height: 700px)
  .hero-section
    margin: 20px 0 30px

  .mobile-stats
    margin: 20px 0

  .mobile-cta
    margin: 30px 0

  .tech-section
    margin: 30px 0

  .features-section
    margin: 30px 0

// Dark mode adjustments
@media (prefers-color-scheme: dark)
  .home-page
    background: radial-gradient(circle at top, rgba(0, 15, 30, 0.95) 0%, #000810 100%)

// Safe area support
@supports (padding: max(0px))
  .content-wrapper
    padding-left: max(16px, env(safe-area-inset-left))
    padding-right: max(16px, env(safe-area-inset-right))

  .mobile-nav-bar
    padding-left: max(16px, env(safe-area-inset-left))
    padding-right: max(16px, env(safe-area-inset-right))
</style>