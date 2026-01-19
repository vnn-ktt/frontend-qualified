<script setup lang="ts">
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'

defineProps<{
  title: string
}>()

const emit = defineEmits<{
  close: []
}>()

const showShake = ref(false)

const close = () => {
  emit('close')
}

// Эффект тряски при ошибке
const shake = () => {
  showShake.value = true
  setTimeout(() => {
    showShake.value = false
  }, 500)
}

defineExpose({ shake })
</script>

<template>
  <div class="auth-modal-overlay" @click.self="close">
    <div class="auth-modal" :class="{ 'shake': showShake }">
      <!-- Закрывающая кнопка -->
      <button class="close-btn" @click="close">
        <el-icon><Close /></el-icon>
      </button>

      <!-- Заголовок -->
      <div class="modal-header">
        <div class="cyber-line"></div>
        <h2 class="modal-title">{{ title }}</h2>
        <div class="cyber-line"></div>
      </div>

      <!-- Контент -->
      <div class="modal-content">
        <slot />
      </div>

      <!-- Футер -->
      <div class="modal-footer">
        <div class="cyber-glitch"></div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.auth-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(10, 10, 31, 0.85);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  animation: fadeIn 0.3s ease;
}

.auth-modal {
  background: var(--cyber-bg-card);
  border: 1px solid var(--cyber-border);
  border-radius: 20px;
  width: 90%;
  max-width: 450px;
  position: relative;
  overflow: hidden;
  animation: slideUp 0.3s ease;
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);

  &.shake {
    animation: shake 0.5s ease;
  }

  .close-btn {
    position: absolute;
    top: 20px;
    right: 20px;
    width: 36px;
    height: 36px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--cyber-border);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 10;
    transition: all 0.3s ease;

    &:hover {
      background: rgba(255, 0, 110, 0.1);
      border-color: var(--color-negative);
      transform: rotate(90deg);

      .el-icon {
        color: var(--color-negative);
      }
    }

    .el-icon {
      color: var(--cyber-glow);
      font-size: 1.2rem;
    }
  }

  .modal-header {
    padding: 40px 40px 20px;
    text-align: center;
    position: relative;

    .cyber-line {
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--cyber-glow),
        transparent
      );
      margin: 10px 0;
      opacity: 0.5;
    }

    .modal-title {
      font-size: 1.8rem;
      font-weight: 800;
      color: var(--cyber-text);
      margin: 0;
      text-transform: uppercase;
      letter-spacing: 2px;
      text-shadow: 0 0 15px rgba(var(--cyber-glow-rgb), 0.3);
    }
  }

  .modal-content {
    padding: 0 40px 30px;
  }

  .modal-footer {
    padding: 20px 40px;
    position: relative;

    .cyber-glitch {
      height: 1px;
      background: linear-gradient(
        90deg,
        var(--color-primary),
        var(--color-accent),
        var(--color-secondary)
      );
      opacity: 0.3;
      filter: blur(1px);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
  20%, 40%, 60%, 80% { transform: translateX(5px); }
}

@media (max-width: 768px) {
  .auth-modal {
    width: 95%;
    
    .modal-header {
      padding: 30px 20px 15px;
      
      .modal-title {
        font-size: 1.5rem;
      }
    }
    
    .modal-content {
      padding: 0 20px 20px;
    }
    
    .modal-footer {
      padding: 15px 20px;
    }
  }
}
</style>