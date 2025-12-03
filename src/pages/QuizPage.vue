<script setup lang="ts">
import Chat from '@/components/chat/Chat.vue'
</script>
<template>
  <q-page class="quiz-page">
    <Chat @back="$router.back()" />
  </q-page>
</template>
<style lang="scss" scoped>
.quiz-page {
  height: 100vh;
  overflow: hidden;
}
</style>