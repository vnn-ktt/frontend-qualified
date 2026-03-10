<script setup lang="ts">
import { IChatMessage } from '@/types/chat'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

defineProps<{
  message: IChatMessage
}>()

const formatTime = (date: Date) => {
  return format(date, 'HH:mm', { locale: ru })
}

const isQuizQuestion = (text: string): boolean => {
  return text.includes('?') || text.includes('вариант') || text.includes('выберите')
}

const parseQuizQuestion = (text: string) => {
  const lines = text.split('\n')
  return lines.map(line => {
    if (line.startsWith('Вариант') || line.match(/^\d+\./)) {
      return `<div class="quiz-option">${line}</div>`
    } else if (line.includes('?')) {
      return `<div class="quiz-question-text">${line}</div>`
    }
    return `<div>${line}</div>`
  }).join('')
}
</script>
<template>
  <div
      :class="[
      'chat-message',
      `chat-message--${message.sender}`,
      { 'chat-message--sending': message.status === 'sending' }
    ]"
      :data-id="message.id"
  >
    <div class="chat-message__avatar">
      <q-avatar
          v-if="message.sender === 'bot'"
          size="32px"
          color="primary"
          text-color="white"
      >
        <q-icon name="smart_toy" />
      </q-avatar>
      <q-avatar
          v-else
          size="32px"
          color="green"
          text-color="white"
      >
        <q-icon name="person" />
      </q-avatar>
    </div>
    <div class="chat-message__content">
      <div class="chat-message__header">
        <span class="chat-message__sender">
          {{ message.sender === 'bot' ? 'QuizBot' : 'Вы' }}
        </span>
        <span class="chat-message__time">
          {{ formatTime(message.timestamp) }}
        </span>
      </div>
      <div class="chat-message__text">
        <div v-if="message.sender === 'bot' && isQuizQuestion(message.text)" class="quiz-question">
          <div v-html="parseQuizQuestion(message.text)"></div>
        </div>
        <div v-else class="plain-text">
          {{ message.text }}
        </div>
      </div>
      <div v-if="message.status" class="chat-message__status">
        <q-spinner
            v-if="message.status === 'sending'"
            size="12px"
            color="grey-6"
        />
        <q-icon
            v-else-if="message.status === 'sent'"
            name="check"
            size="12px"
            color="green"
        />
        <q-icon
            v-else-if="message.status === 'error'"
            name="error"
            size="12px"
            color="red"
        />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.chat-message {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  opacity: 1;
  transition: opacity 0.3s ease;

  &--sending {
    opacity: 0.7;
  }

  &--user {
    flex-direction: row-reverse;

    .chat-message__content {
      align-items: flex-end;
      text-align: right;
    }

    .chat-message__avatar {
      order: 2;
    }
  }

  &__avatar {
    flex-shrink: 0;
  }

  &__content {
    max-width: 70%;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2px;
  }

  &__sender {
    font-size: 0.85rem;
    font-weight: 600;
    color: var(--q-primary);
  }

  &__time {
    font-size: 0.75rem;
    color: var(--q-grey-6);
  }

  &__text {
    background: white;
    padding: 12px 16px;
    border-radius: 12px;
    font-size: 0.95rem;
    line-height: 1.4;
    word-break: break-word;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    .chat-message--user & {
      background: var(--q-primary);
      color: white;
    }

    .chat-message--bot & {
      background: var(--q-grey-1);
      color: var(--q-dark);
    }
  }

  &__status {
    display: flex;
    justify-content: flex-end;
    margin-top: 4px;
  }
}

.quiz-question {
  .quiz-question-text {
    font-weight: 600;
    margin-bottom: 12px;
    color: var(--q-primary);
  }

  .quiz-option {
    padding: 8px 12px;
    margin: 4px 0;
    background: white;
    border: 1px solid var(--q-grey-3);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: var(--q-grey-1);
      border-color: var(--q-primary);
    }
  }
}

// Темная тема
.body--dark {
  .chat-message__text {
    &.chat-message--bot & {
      background: var(--q-dark);
      color: white;
    }
  }

  .quiz-option {
    background: var(--q-dark);
    border-color: var(--q-grey-7);
    color: white;

    &:hover {
      background: var(--q-grey-9);
      border-color: var(--q-primary);
    }
  }
}
</style>