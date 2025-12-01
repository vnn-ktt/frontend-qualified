<template>
  <q-page class="home-page">

    <Background />

    <!-- Main Content -->
<!--    <div class="content-wrapper column items-center justify-center text-center">-->

<!--      &lt;!&ndash; Animated Title &ndash;&gt;-->
<!--      <div class="title-container">-->
<!--        <h1 class="main-title glitch-text" data-text="QuizBot">QuizBot</h1>-->
<!--        <div class="title-subtext neon-pulse">NEURAL NETWORK ACTIVATED</div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Subtitle with terminal effect &ndash;&gt;-->
<!--      <div class="subtitle-container">-->
<!--        <p class="subtitle terminal-type typing">-->
<!--          Test your skills in JavaScript & Python!-->
<!--        </p>-->
<!--      </div>-->

<!--      &lt;!&ndash; Stats Cards &ndash;&gt;-->
<!--      <div class="stats-container row wrap justify-center q-mb-xl">-->
<!--        <q-card class="stats-card cyber-float" style="animation-delay: 0s">-->
<!--          <q-card-section class="text-center">-->
<!--            <div class="stat-number text-glow-cyan">100+</div>-->
<!--            <div class="stat-label">Questions</div>-->
<!--          </q-card-section>-->
<!--        </q-card>-->

<!--        <q-card class="stats-card cyber-float" style="animation-delay: 0.2s">-->
<!--          <q-card-section class="text-center">-->
<!--            <div class="stat-number text-glow-blue">2</div>-->
<!--            <div class="stat-label">Languages</div>-->
<!--          </q-card-section>-->
<!--        </q-card>-->

<!--        <q-card class="stats-card cyber-float" style="animation-delay: 0.4s">-->
<!--          <q-card-section class="text-center">-->
<!--            <div class="stat-number text-glow-purple">∞</div>-->
<!--            <div class="stat-label">Challenges</div>-->
<!--          </q-card-section>-->
<!--        </q-card>-->
<!--      </div>-->

<!--      &lt;!&ndash; CTA Section &ndash;&gt;-->
<!--      <div class="cta-section">-->
<!--        <q-btn-->
<!--            label="Initialize Quiz Sequence"-->
<!--            size="lg"-->
<!--            color="primary"-->
<!--            icon="play_arrow"-->
<!--            class="cta-btn scan-btn neon-pulse"-->
<!--            @click="startQuiz"-->
<!--        />-->

<!--        <div class="cta-subtext">-->
<!--          <span class="terminal-blink">></span> Press to begin neural assessment-->
<!--        </div>-->
<!--      </div>-->

<!--      &lt;!&ndash; Tech Cards &ndash;&gt;-->
<!--      <div class="tech-cards row wrap justify-center q-mt-xl">-->
<!--        <q-card class="tech-card" v-for="tech in technologies" :key="tech.name">-->
<!--          <q-card-section class="text-center">-->
<!--            <div class="tech-icon" :class="tech.iconClass">{{ tech.icon }}</div>-->
<!--            <div class="tech-name">{{ tech.name }}</div>-->
<!--            <div class="tech-status" :class="tech.statusClass">{{ tech.status }}</div>-->
<!--          </q-card-section>-->
<!--        </q-card>-->
<!--      </div>-->

<!--    </div>-->

  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import Background from '@/components/animated/Background.vue'

const router = useRouter()

const technologies = ref([
  {
    name: 'JavaScript',
    icon: '{}',
    iconClass: 'js-glow',
    status: 'ONLINE',
    statusClass: 'status-online'
  },
  {
    name: 'Python',
    icon: '🐍',
    iconClass: 'python-glow',
    status: 'ONLINE',
    statusClass: 'status-online'
  },
  {
    name: 'Vue.js',
    icon: '⚡',
    iconClass: 'vue-glow',
    status: 'ACTIVE',
    statusClass: 'status-active'
  },
  {
    name: 'Quasar',
    icon: '🎯',
    iconClass: 'quasar-glow',
    status: 'READY',
    statusClass: 'status-ready'
  }
])

const startQuiz = () => {
  // Анимация перед переходом
  const btn = document.querySelector('.cta-btn')
  btn?.classList.add('btn-activate')

  setTimeout(() => {
    router.push('/quiz')
  }, 800)
}
</script>

<style lang="sass" scoped>
.home-page
  width: 100%
  min-height: 100vh
  position: relative
  overflow: hidden

.content-wrapper
  position: relative
  z-index: 1
  min-height: 100vh
  padding: 2rem

// Title Styles
.title-container
  margin-bottom: 2rem

.main-title
  font-size: 4rem
  font-weight: 900
  font-family: 'Courier New', monospace
  background: linear-gradient(45deg, var(--q-primary), var(--q-secondary), var(--q-accent))
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  background-clip: text
  margin-bottom: 1rem
  text-transform: uppercase
  letter-spacing: 3px

.title-subtext
  font-size: 0.9rem
  color: var(--q-positive)
  font-family: 'Courier New', monospace
  letter-spacing: 2px

// Subtitle
.subtitle-container
  margin-bottom: 3rem

.subtitle
  font-size: 1.3rem
  color: var(--cyber-text)
  font-family: 'Courier New', monospace
  max-width: 500px

// Stats Cards
.stats-container
  gap: 2rem
  margin-bottom: 3rem

.stats-card
  width: 140px
  height: 120px
  background: rgba(0, 20, 51, 0.6)
  backdrop-filter: blur(10px)
  border: 1px solid var(--cyber-border)

.stat-number
  font-size: 2.5rem
  font-weight: 900
  font-family: 'Courier New', monospace
  margin-bottom: 0.5rem

.stat-label
  font-size: 0.9rem
  color: var(--cyber-text)
  text-transform: uppercase
  letter-spacing: 1px

// CTA Section
.cta-section
  margin-bottom: 4rem

.cta-btn
  font-size: 1.2rem
  padding: 1rem 2rem
  margin-bottom: 1rem

  &.btn-activate
    animation: btn-activate 0.8s ease-out forwards

.cta-subtext
  font-family: 'Courier New', monospace
  color: var(--q-info)
  font-size: 0.9rem

// Tech Cards
.tech-cards
  gap: 1.5rem

.tech-card
  width: 140px
  height: 140px
  background: rgba(0, 20, 51, 0.4)
  backdrop-filter: blur(5px)
  border: 1px solid var(--cyber-border)
  transition: all 0.3s ease

  &:hover
    transform: translateY(-8px)
    box-shadow: 0 0 30px rgba(0, 212, 255, 0.4)

.tech-icon
  font-size: 2.5rem
  margin-bottom: 0.5rem
  font-weight: bold

.tech-name
  font-size: 1rem
  font-weight: 700
  margin-bottom: 0.5rem
  color: var(--cyber-text)

.tech-status
  font-size: 0.8rem
  font-family: 'Courier New', monospace
  text-transform: uppercase

.status-online
  color: var(--q-positive)

.status-active
  color: var(--q-primary)

.status-ready
  color: var(--q-info)

// Glow эффекты для иконок
.js-glow
  color: #F7DF1E
  text-shadow: 0 0 10px #F7DF1E

.python-glow
  color: #3776AB
  text-shadow: 0 0 10px #3776AB

.vue-glow
  color: #4FC08D
  text-shadow: 0 0 10px #4FC08D

.quasar-glow
  color: #00D4FF
  text-shadow: 0 0 10px #00D4FF

// Дополнительные анимации
@keyframes btn-activate
  0%
    transform: scale(1)
    box-shadow: 0 0 20px var(--q-primary)
  50%
    transform: scale(1.1)
    box-shadow: 0 0 40px var(--q-primary), 0 0 60px var(--q-accent)
  100%
    transform: scale(1)
    box-shadow: 0 0 25px var(--q-primary)

// Адаптивность
@media (max-width: 768px)
  .main-title
    font-size: 2.5rem

  .subtitle
    font-size: 1.1rem

  .stats-card
    width: 120px
    height: 100px

  .tech-card
    width: 120px
    height: 120px

@media (max-width: 480px)
  .main-title
    font-size: 2rem
    letter-spacing: 2px

  .title-subtext
    font-size: 0.8rem

  .content-wrapper
    padding: 1rem
</style>