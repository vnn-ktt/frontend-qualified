<script setup lang="ts">
import { ref, onMounted } from 'vue'
type TStarSize = 1 | 2 | 3
type TMoveDirection = 'up' | 'down'
interface Star {
  id: number
  top: number
  left: number
  size: TStarSize
  speed: number
  delay: number
  moveDirection: TMoveDirection
}
const stars = ref<Star[]>([])
const generateStars = (count: number) => {
  const starArr: Star[] = []
  for (let i = 0; i < count; i++) {
    const direction: TMoveDirection = Math.random() > 0.5 ? 'down' : 'up'
    starArr.push({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.floor(Math.random() * 3) + 1 as TStarSize,
      speed: 10 + Math.random() * 4,
      delay: Math.random() * 5,
      moveDirection: direction
    })
  }
  return starArr
}
onMounted(() => {
  stars.value = generateStars(150)
})
</script>
<template>
  <div class="stars-background">
    <div class="stars-container">
      <div
          v-for="star in stars"
          :key="star.id"
          class="star"
          :class="[`size-${star.size}`, `direction-${star.moveDirection}`]"
          :style="{
          top: star.top + '%',
          left: star.left + '%',
          '--star-speed': star.speed + 's',
          '--star-delay': star.delay + 's',
        }"
      ></div>
    </div>
  </div>
</template>
<style lang="sass" scoped>
.stars-background
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  z-index: 0
  overflow: hidden
  pointer-events: none

.stars-container
  position: absolute
  width: 100%
  height: 100%

.star
  position: absolute
  background: #b3c2ff
  border-radius: 50%
  transform: translate(-50%, -50%)
  opacity: 0.6
  &.direction-down
    animation: moveDown var(--star-speed) ease-in-out infinite
    animation-delay: var(--star-delay)
  &.direction-up
    animation: moveUp var(--star-speed) ease-in-out infinite
    animation-delay: var(--star-delay)
  &.size-1
    width: 1px
    height: 1px
    box-shadow: 0 0 2px rgba(120, 150, 255, 0.8)
  &.size-2
    width: 2px
    height: 2px
    box-shadow: 0 0 3px rgba(120, 150, 255, 0.8), 0 0 6px rgba(120, 150, 255, 0.4)
  &.size-3
    width: 3px
    height: 3px
    box-shadow: 0 0 4px rgba(120, 150, 255, 0.9), 0 0 9px rgba(120, 150, 255, 0.5)

@keyframes moveDown
  0%
    transform: translate(-50%, -50%) translateY(0)
  100%
    transform: translate(-50%, -50%) translateY(100vh)

@keyframes moveUp
  0%
    transform: translate(-50%, -50%) translateY(0)
  100%
    transform: translate(-50%, -50%) translateY(-100vh)
</style>