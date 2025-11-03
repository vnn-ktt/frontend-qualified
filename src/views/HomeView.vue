<template>
  <q-page class="home-page column items-center justify-center text-center">

    <!-- Title -->
    <div class="title neon-text">
      QuizBot
    </div>

    <!-- Subtitle -->
    <div class="subtitle">
      Test your skills in JavaScript & Python!
    </div>

    <!-- Start Quiz Button -->
    <q-btn
        label="Start Quiz"
        size="lg"
        color="primary"
        class="neon-btn q-mt-xl"
        @click="startQuiz"
    />

    <!-- Optional decorative cards -->
    <div class="cards-container row wrap justify-center q-mt-xl">
      <q-card class="neon-card q-ma-sm" style="width: 120px; height: 120px">
        <q-card-section class="text-h6 text-center">JS</q-card-section>
      </q-card>
      <q-card class="neon-card q-ma-sm" style="width: 120px; height: 120px">
        <q-card-section class="text-h6 text-center">Python</q-card-section>
      </q-card>
      <q-card class="neon-card q-ma-sm" style="width: 120px; height: 120px">
        <q-card-section class="text-h6 text-center">Quiz</q-card-section>
      </q-card>
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const startQuiz = () => {
  router.push('/quiz')  // make sure you have /quiz route
}
</script>

<style lang="sass" scoped>
.home-page
  width: 100%
  min-height: 100vh
  background: linear-gradient(160deg, var(--color-background), #1a2236)
  padding: 2rem
  transition: background 0.3s

.title
  font-size: 3rem
  font-weight: 700
  color: var(--color-primary)
  font-family: 'Exo 2', sans-serif
  text-shadow: 0 0 5px var(--color-primary), 0 0 15px var(--color-accent), 0 0 20px var(--color-accent)
  margin-bottom: 0.5rem

.subtitle
  font-size: 1.25rem
  color: var(--text-secondary)
  text-shadow: 0 0 5px var(--color-accent)
  margin-bottom: 2rem

.neon-btn
  font-weight: 600
  letter-spacing: 0.05em
  box-shadow: 0 0 10px var(--color-primary), 0 0 20px var(--color-accent)
  transition: all 0.3s
  &:hover
    box-shadow: 0 0 20px var(--color-primary), 0 0 40px var(--color-accent)
    transform: translateY(-2px)

.cards-container
  max-width: 360px

.neon-card
  background-color: var(--color-surface)
  border: 1px solid var(--color-border)
  box-shadow: 0 0 8px var(--color-accent)
  color: var(--text-primary)
  display: flex
  align-items: center
  justify-content: center
  font-weight: 700
  text-transform: uppercase
  transition: transform 0.2s, box-shadow 0.2s
  &:hover
    transform: translateY(-5px)
    box-shadow: 0 0 20px var(--color-accent), 0 0 40px var(--color-primary)

@media (max-width: 420px)
  .title
    font-size: 2.2rem
  .subtitle
    font-size: 1rem
  .cards-container
    max-width: 300px
</style>