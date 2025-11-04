<template>
  <div class="stars-background">
    <!-- Основное звездное поле -->
    <div class="stars-container">
      <div
          v-for="star in stars"
          :key="star.id"
          class="star"
          :class="`size-${star.size}`"
          :style="{
          top: star.top + '%',
          left: star.left + '%',
          animation: `twinkle ${star.twinkleSpeed}s ease-in-out infinite`,
          animationDelay: star.delay + 's'
        }"
      ></div>
    </div>

    <!-- Движущиеся звезды (метеоры) -->
    <div class="meteors">
      <div
          v-for="meteor in meteors"
          :key="meteor.id"
          class="shooting-star"
          :style="{
          top: meteor.startY + '%',
          left: meteor.startX + '%',
          animation: `shoot ${meteor.speed}s linear infinite`,
          animationDelay: meteor.delay + 's'
        }"
      ></div>
    </div>

    <!-- Созвездия -->
    <div class="constellations">
      <div
          v-for="constellation in constellations"
          :key="constellation.id"
          class="constellation"
      >
        <div
            v-for="star in constellation.stars"
            :key="star.id"
            class="constellation-star"
            :style="{
            top: star.y + '%',
            left: star.x + '%'
          }"
        ></div>
        <svg class="constellation-lines" width="100%" height="100%">
          <line
              v-for="line in constellation.lines"
              :key="line.id"
              :x1="line.x1 + '%'"
              :y1="line.y1 + '%'"
              :x2="line.x2 + '%'"
              :y2="line.y2 + '%'"
              class="constellation-line"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type TStarSize = 1 | 2 | 3
interface Star {
  id: number
  top: number
  left: number
  size: TStarSize
  twinkleSpeed: number
  delay: number
}
interface Meteor {
  id: number
  startX: number
  startY: number
  speed: number
  delay: number
}
interface ConstellationStar {
  id: number
  x: number
  y: number
}
interface ConstellationLine {
  id: number
  x1: number
  y1: number
  x2: number
  y2: number
}
interface Constellation {
  id: number
  stars: ConstellationStar[]
  lines: ConstellationLine[]
}

const stars = ref<Star[]>([])
const generateStars = (count: number) => {
  const starArr: Star[] = []
  for (let i = 0; i < count; i++) {
    starArr.push({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 3) + 1 as TStarSize,
      twinkleSpeed: 2 + Math.random() * 4,
      delay: Math.random() * 5
    })
  }
  return starArr
}
const meteors = ref<Meteor[]>([
  { id: 1, startX: -10, startY: 15, speed: 3, delay: 0 },
  { id: 2, startX: 120, startY: 25, speed: 4, delay: 8 },
  { id: 3, startX: -5, startY: 40, speed: 2.5, delay: 15 },
  { id: 4, startX: 110, startY: 60, speed: 3.5, delay: 22 }
])
const generateMeteors = (count: number) => {
  const meteorArr: Meteor[] = []
  for (let i = 0; i < count; i++) {
    meteorArr.push({
      id: i,
      startX: Math.random() * 10,
      startY: Math.random() * 10,
      speed: Math.random() * 10,
      delay: Math.random() * 5
    })
  }
  return meteorArr
}
const constellations = ref<Constellation[]>([
  {
    id: 1,
    stars: [
      { id: 1, x: 20, y: 30 },
      { id: 2, x: 25, y: 35 },
      { id: 3, x: 30, y: 28 },
      { id: 4, x: 35, y: 33 },
      { id: 5, x: 40, y: 30 }
    ],
    lines: [
      { id: 1, x1: 20, y1: 30, x2: 25, y2: 35 },
      { id: 2, x1: 25, y1: 35, x2: 30, y2: 28 },
      { id: 3, x1: 30, y1: 28, x2: 35, y2: 33 },
      { id: 4, x1: 35, y1: 33, x2: 40, y2: 30 }
    ]
  },
  {
    id: 2,
    stars: [
      { id: 1, x: 70, y: 25 },
      { id: 2, x: 75, y: 20 },
      { id: 3, x: 80, y: 25 },
      { id: 4, x: 75, y: 30 }
    ],
    lines: [
      { id: 1, x1: 70, y1: 25, x2: 75, y2: 20 },
      { id: 2, x1: 75, y1: 20, x2: 80, y2: 25 },
      { id: 3, x1: 80, y1: 25, x2: 75, y2: 30 },
      { id: 4, x1: 75, y1: 30, x2: 70, y2: 25 }
    ]
  }
])

stars.value = generateStars(100)
meteors.value = generateMeteors(10)
</script>

<style lang="sass" scoped>
.stars-background
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  background: linear-gradient(135deg, #0a0a20 0%, #1a1a3a 30%, #0a0a20 70%, #050515 100%)
  z-index: 0
  overflow: hidden
  pointer-events: none

.stars-container, .meteors
  position: absolute
  width: 100%
  height: 100%


.star
  position: absolute
  background: white
  border-radius: 50%
  transform: translate(-50%, -50%)

  &.size-1
    width: 1px
    height: 1px
    box-shadow: 0 0 2px white

  &.size-2
    width: 2px
    height: 2px
    box-shadow: 0 0 3px white, 0 0 5px rgba(255, 255, 255, 0.5)

  &.size-3
    width: 3px
    height: 3px
    box-shadow: 0 0 4px white, 0 0 8px rgba(255, 255, 255, 0.6)


.shooting-stars
  position: absolute
  width: 100%
  height: 100%
.shooting-star
  position: absolute
  width: 2px
  height: 2px
  background: white
  border-radius: 50%
  box-shadow: 0 0 10px white, 0 0 20px white
  opacity: 0


.galaxies
  position: absolute
  width: 100%
  height: 100%

.galaxy
  position: absolute
  border-radius: 50%
  transform: translate(-50%, -50%)
  opacity: 0.1

  &.spiral
    background: radial-gradient(circle, transparent 40%, rgba(255, 255, 255, 0.05) 70%)
    box-shadow: 0 0 100px rgba(255, 255, 255, 0.05)

  &.elliptical
    background: radial-gradient(ellipse, rgba(255, 255, 255, 0.03) 0%, transparent 70%)


.nebulae
  position: absolute
  width: 100%
  height: 100%

.nebula
  position: absolute
  border-radius: 50%
  filter: blur(20px)
  opacity: 0.3
  transform: translate(-50%, -50%)


.constellations
  position: absolute
  width: 100%
  height: 100%

.constellation
  position: absolute
  width: 100%
  height: 100%

.constellation-star
  position: absolute
  width: 4px
  height: 4px
  background: white
  border-radius: 50%
  box-shadow: 0 0 8px rgba(0, 212, 255, 0.5)
  transform: translate(-50%, -50%)
  animation: constellation-pulse 4s ease-in-out infinite


.constellation-lines
  position: absolute
  top: 0
  left: 0

.constellation-line
  stroke: rgba(0, 212, 255, 0.2)
  stroke-width: 1
  stroke-dasharray: 3, 3


@keyframes twinkle
  0%, 100%
    opacity: 0.3
    transform: translate(-50%, -50%) scale(1)
  50%
    opacity: 1
    transform: translate(-50%, -50%) scale(1.2)

@keyframes shoot
  0%
    transform: translateX(0) translateY(0) rotate(45deg)
    opacity: 0
  10%
    opacity: 1
  20%
    opacity: 0.8
  100%
    transform: translateX(100vw) translateY(100vh) rotate(45deg)
    opacity: 0

@keyframes galaxy-rotate
  0%
    transform: translate(-50%, -50%) rotate(0deg)
  100%
    transform: translate(-50%, -50%) rotate(360deg)

@keyframes nebula-drift
  0%
    transform: translate(-50%, -50%) scale(1)
  100%
    transform: translate(calc(-50% + 20px), calc(-50% + 10px)) scale(1.1)

@keyframes planet-float
  0%, 100%
    transform: translate(-50%, -50%) translateY(0px)
  50%
    transform: translate(-50%, -50%) translateY(-10px)

@keyframes constellation-pulse
  0%, 100%
    opacity: 0.5
    box-shadow: 0 0 8px rgba(0, 212, 255, 0.3)
  50%
    opacity: 1
    box-shadow: 0 0 15px rgba(0, 212, 255, 0.8), 0 0 25px rgba(0, 212, 255, 0.4)
</style>