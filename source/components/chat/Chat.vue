<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ChatMessage from '@/components/chat/Message.vue'
import TypingIndicator from '@/components/chat/TypeIndicator.vue'
import QuickActions from '@/components/chat/QuickAction.vue'
import { IChatMessage, IQuickAction } from '@/types/chat'

const messages = ref<IChatMessage[]>([
  {
    id: uuidv4(),
    text: 'Привет! Я QuizBot 🤖 Готов проверить твои знания в программировании!',
    sender: 'bot',
    timestamp: new Date(),
    status: 'sent'
  }
])
const userInput = ref('')
const loading = ref(false)
const showAttachments = ref(false)
const showTypingIndicator = ref(false)
const messagesContainer = ref<HTMLElement>()

const quickActions = ref<IQuickAction[]>([
  { label: 'Начать викторину', icon: 'quiz', command: '/start_quiz', color: 'primary' },
  { label: 'JavaScript', icon: 'code', command: '/quiz js', color: 'blue' },
  { label: 'Python', icon: 'terminal', command: '/quiz python', color: 'green' },
  { label: 'Вопрос дня', icon: 'today', command: '/daily', color: 'orange' },
  { label: 'Статистика', icon: 'analytics', command: '/stats', color: 'purple' },
  { label: 'Помощь', icon: 'help', command: '/help', color: 'grey' }
])

const connectionStatus = computed(() => {
  if (loading.value) return { text: 'Подключение...', color: 'warning' }
  return { text: 'Подключено', color: 'positive' }
})

const lastMessageStatus = computed(() => {
  const lastUserMsg = [...messages.value].reverse().find(msg => msg.sender === 'user')
  if (!lastUserMsg) return null

  switch (lastUserMsg.status) {
    case 'sending': return { text: 'Отправка...', color: 'warning', icon: 'schedule' }
    case 'sent': return { text: 'Доставлено', color: 'positive', icon: 'check' }
    case 'error': return { text: 'Ошибка', color: 'negative', icon: 'error' }
    default: return null
  }
})

const sendMessage = async () => {
  const text = userInput.value.trim()
  if (!text || loading.value) return

  // Добавляем сообщение пользователя
  const userMessage: IChatMessage = {
    id: uuidv4(),
    text,
    sender: 'user',
    timestamp: new Date(),
    status: 'sending'
  }

  messages.value.push(userMessage)
  userInput.value = ''
  scrollToBottom()

  loading.value = true
  showTypingIndicator.value = true

  try {
    // Отправляем запрос к API
    const response = await fetch('/api/telegram/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        message: text,
        chatId: 'telegram-chat-' + Date.now()
      })
    })

    const data = await response.json()

    if (data.success) {
      // Обновляем статус сообщения
      userMessage.status = 'sent'

      // Добавляем ответ бота
      setTimeout(() => {
        addBotMessage(data.reply || 'Я получил твое сообщение!')
        showTypingIndicator.value = false
        loading.value = false
      }, 1000)

    } else {
      throw new Error(data.error || 'Ошибка сервера')
    }

  } catch (error) {
    console.error('Ошибка отправки:', error)
    userMessage.status = 'error'

    // Fallback сообщение
    setTimeout(() => {
      addBotMessage('Извините, произошла ошибка. Попробуйте позже.')
      showTypingIndicator.value = false
      loading.value = false
    }, 500)

    $q.notify({
      type: 'negative',
      message: 'Ошибка отправки сообщения',
      caption: error.message
    })
  }
}

const addBotMessage = (text: string) => {
  const botMessage: IChatMessage = {
    id: uuidv4(),
    text,
    sender: 'bot',
    timestamp: new Date(),
    status: 'sent'
  }

  messages.value.push(botMessage)
  scrollToBottom()
}

const handleQuickAction = (command: string) => {
  userInput.value = command
  sendMessage()
}

const sendQuizCommand = (command: string) => {
  userInput.value = command
  showAttachments.value = false
  nextTick(() => sendMessage())
}

const startVoiceInput = () => {
  // Реализация голосового ввода
  $q.notify({
    message: 'Голосовой ввод в разработке',
    color: 'info'
  })
}

const scrollToBottom = () => {
  nextTick(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  })
}

// Lifecycle
onMounted(() => {
  // Загружаем историю чата
  loadChatHistory()
  scrollToBottom()
})

const loadChatHistory = async () => {
  try {
    const savedMessages = localStorage.getItem('telegram-chat-history')
    if (savedMessages) {
      const parsed = JSON.parse(savedMessages)
      messages.value = parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }
  } catch (error) {
    console.log('История не загружена')
  }
}

// Сохраняем историю
watch(messages, (newMessages) => {
  try {
    const toSave = newMessages.map(msg => ({
      ...msg,
      timestamp: msg.timestamp.toISOString()
    }))
    localStorage.setItem('telegram-chat-history', JSON.stringify(toSave))
  } catch (error) {
    console.error('Ошибка сохранения истории')
  }
}, { deep: true })

defineEmits<{
  back: []
}>()
</script>
<template>
  <div class="telegram-chat">
    <!-- Заголовок -->
    <div class="chat-header">
      <div class="chat-header__left">
        <q-btn
            flat
            round
            dense
            icon="arrow_back"
            @click="$emit('back')"
            class="chat-header__back-btn"
        />
        <div class="chat-header__title">
          <q-icon name="quiz" class="chat-header__icon" />
          <span>Telegram Quiz Bot</span>
        </div>
      </div>

      <div class="chat-header__status">
        <q-spinner v-if="loading" color="primary" size="sm" />
        <q-icon v-else name="wifi" size="sm" :color="connectionStatus.color" />
        <span class="chat-header__status-text">{{ connectionStatus.text }}</span>
      </div>
    </div>

    <!-- Быстрые действия -->
    <QuickActions
        :actions="quickActions"
        :disabled="loading"
        @action="handleQuickAction"
    />

    <!-- Сообщения -->
    <div class="chat-messages" ref="messagesContainer">
      <!-- Приветственное сообщение -->
      <div v-if="messages.length === 0" class="welcome-message">
        <q-icon name="chat" size="64px" color="primary" class="welcome-message__icon" />
        <div class="welcome-message__text">
          <h4>Добро пожаловать в QuizBot!</h4>
          <p>Начните чат или используйте кнопки ниже</p>
        </div>
      </div>

      <!-- Список сообщений -->
      <ChatMessage
          v-for="message in messages"
          :key="message.id"
          :message="message"
      />

      <!-- Индикатор печати -->
      <TypingIndicator v-if="showTypingIndicator" />
    </div>

    <!-- Поле ввода -->
    <div class="chat-input">
      <div class="chat-input__field">
        <q-input
            v-model="userInput"
            placeholder="Введите сообщение..."
            outlined
            dense
            @keyup.enter="sendMessage"
            :disable="loading"
            class="chat-input__textarea"
            autogrow
        >
          <template v-slot:before>
            <q-btn
                round
                dense
                flat
                icon="add"
                color="primary"
                @click="showAttachments = !showAttachments"
            >
              <q-menu v-model="showAttachments" anchor="top start" self="bottom start">
                <q-list dense style="min-width: 150px">
                  <q-item clickable v-close-popup @click="sendQuizCommand('/quiz js')">
                    <q-item-section avatar>
                      <q-icon name="code" />
                    </q-item-section>
                    <q-item-section>JavaScript Quiz</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="sendQuizCommand('/quiz python')">
                    <q-item-section avatar>
                      <q-icon name="terminal" />
                    </q-item-section>
                    <q-item-section>Python Quiz</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup @click="sendQuizCommand('/help')">
                    <q-item-section avatar>
                      <q-icon name="help" />
                    </q-item-section>
                    <q-item-section>Помощь</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
          </template>

          <template v-slot:append>
            <q-btn
                round
                dense
                flat
                :icon="userInput.trim() ? 'send' : 'mic'"
                :color="userInput.trim() ? 'primary' : 'grey'"
                @click="userInput.trim() ? sendMessage() : startVoiceInput()"
                :disable="loading"
                class="chat-input__send-btn"
            />
          </template>
        </q-input>
      </div>

      <!-- Индикатор состояния -->
      <div class="chat-input__status">
        <q-chip
            v-if="lastMessageStatus"
            :color="lastMessageStatus.color"
            text-color="white"
            dense
            size="sm"
            :icon="lastMessageStatus.icon"
        >
          {{ lastMessageStatus.text }}
        </q-chip>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.telegram-chat {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--q-grey-1);
}

.chat-header {
  padding: 12px 16px;
  background: white;
  border-bottom: 1px solid var(--q-grey-3);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  &__left {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  &__back-btn {
    color: var(--q-primary);
  }

  &__title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--q-dark);
  }

  &__icon {
    color: var(--q-primary);
  }

  &__status {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.85rem;
    color: var(--q-grey-7);
  }

  &__status-text {
    margin-left: 4px;
  }
}

.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--q-grey-4);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--q-grey-6);
  }
}

.welcome-message {
  text-align: center;
  padding: 40px 20px;
  margin: auto 0;

  &__icon {
    margin-bottom: 16px;
    opacity: 0.8;
  }

  &__text {
    h4 {
      margin: 0 0 8px 0;
      color: var(--q-dark);
      font-weight: 600;
    }

    p {
      margin: 0;
      color: var(--q-grey-7);
      font-size: 0.95rem;
    }
  }
}

.chat-input {
  padding: 16px;
  background: white;
  border-top: 1px solid var(--q-grey-3);
  flex-shrink: 0;

  &__field {
    margin-bottom: 8px;
  }

  &__textarea {
    :deep(.q-field__control) {
      border-radius: 20px;
      min-height: 40px;
    }

    :deep(textarea) {
      max-height: 120px;
    }
  }

  &__send-btn {
    transition: all 0.2s ease;

    &:hover:not(:disabled) {
      transform: scale(1.1);
    }
  }

  &__status {
    min-height: 28px;
    display: flex;
    align-items: center;
  }
}

// Темная тема
.body--dark {
  .telegram-chat {
    background: var(--q-dark-page);
  }

  .chat-header {
    background: var(--q-dark);
    border-bottom-color: var(--q-grey-9);

    &__title {
      color: white;
    }
  }

  .welcome-message {
    &__text h4 {
      color: white;
    }

    &__text p {
      color: var(--q-grey-4);
    }
  }

  .chat-input {
    background: var(--q-dark);
    border-top-color: var(--q-grey-9);
  }

  .chat-messages::-webkit-scrollbar-thumb {
    background: var(--q-grey-7);
  }
}
</style>