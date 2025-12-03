<script setup lang="ts">
import { IQuickAction } from '@/types/chat'

defineProps<{
  actions: IQuickAction[]
  disabled?: boolean
}>()

defineEmits<{
  action: [command: string]
}>()
</script>
<template>
  <div class="quick-actions">
    <div class="quick-actions__label">
      Быстрые действия:
    </div>

    <div class="quick-actions__list">
      <q-btn
          v-for="action in actions"
          :key="action.command"
          :label="action.label"
          :icon="action.icon"
          :color="action.color || 'primary'"
          outline
          size="sm"
          dense
          class="quick-actions__button"
          @click="$emit('action', action.command)"
          :disable="disabled"
      >
        <q-tooltip>{{ action.command }}</q-tooltip>
      </q-btn>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.quick-actions {
  padding: 12px 0;
  border-bottom: 1px solid var(--q-grey-3);

  &__label {
    font-size: 0.85rem;
    color: var(--q-grey-7);
    margin-bottom: 8px;
  }

  &__list {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    padding-bottom: 4px;

    &::-webkit-scrollbar {
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: var(--q-grey-2);
      border-radius: 2px;
    }

    &::-webkit-scrollbar-thumb {
      background: var(--q-grey-4);
      border-radius: 2px;
    }
  }

  &__button {
    white-space: nowrap;
    min-width: fit-content;
  }
}

// Темная тема
.body--dark {
  .quick-actions {
    border-bottom-color: var(--q-grey-8);

    &__label {
      color: var(--q-grey-4);
    }
  }

  .quick-actions__list::-webkit-scrollbar-track {
    background: var(--q-grey-9);
  }

  .quick-actions__list::-webkit-scrollbar-thumb {
    background: var(--q-grey-7);
  }
}
</style>