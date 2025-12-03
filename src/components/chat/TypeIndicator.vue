<script setup lang="ts">

</script>
<template>
  <div class="typing-indicator">
    <div class="typing-indicator__content">
      <div class="typing-indicator__avatar">
        <q-avatar size="32px" color="primary" text-color="white">
          <q-icon name="smart_toy" />
        </q-avatar>
      </div>
      <div class="typing-indicator__bubble">
        <div class="typing-indicator__dots">
          <span
              v-for="n in 3"
              :key="n"
              class="typing-indicator__dot"
              :style="`animation-delay: ${(n - 1) * 0.2}s`"
          ></span>
        </div>
        <div class="typing-indicator__text">Бот печатает...</div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.typing-indicator {
  margin-bottom: 16px;
  opacity: 0;
  animation: fadeIn 0.3s ease forwards;

  &__content {
    display: flex;
    gap: 12px;
  }

  &__bubble {
    background: var(--q-grey-1);
    padding: 12px 16px;
    border-radius: 12px;
    display: flex;
    align-items: center;
    gap: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  &__dots {
    display: flex;
    gap: 4px;
  }

  &__dot {
    width: 6px;
    height: 6px;
    background: var(--q-grey-6);
    border-radius: 50%;
    animation: typing 1.4s infinite;
  }

  &__text {
    font-size: 0.85rem;
    color: var(--q-grey-7);
  }
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  30% {
    transform: translateY(-4px);
    opacity: 1;
  }
}

// Темная тема
.body--dark {
  .typing-indicator__bubble {
    background: var(--q-dark);
  }

  .typing-indicator__dot {
    background: var(--q-grey-4);
  }

  .typing-indicator__text {
    color: var(--q-grey-4);
  }
}
</style>