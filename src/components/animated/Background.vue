<script setup lang="ts">
import { ref, onMounted } from 'vue'
type TStarSize = 1 | 2 | 3
interface Star {
  id: number
  top: number
  left: number
  size: TStarSize
  twinkleSpeed: number
  delay: number
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
onMounted(() => {
  stars.value = generateStars(100)
})
</script>
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
.star
  position: absolute
  background: #b3c2ff
  border-radius: 50%
  transform: translate(-50%, -50%)
  opacity: .7

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

</style>
<template>
  <div class="stars-background">
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
  </div>
</template>