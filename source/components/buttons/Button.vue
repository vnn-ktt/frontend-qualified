<script setup lang="ts">
interface Props {
  type?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
  size?: 'small' | 'medium' | 'large'
  glow?: boolean
  loading?: boolean
  disabled?: boolean
  fullWidth?: boolean
  icon?: any
}

withDefaults(defineProps<Props>(), {
  type: 'primary',
  size: 'medium',
  glow: false,
  loading: false,
  disabled: false,
  fullWidth: false
})

defineEmits<{
  click: [event: MouseEvent]
}>()
</script>

<template>
  <button 
    :class="[
      'button',
      `button--${type}`,
      `button--${size}`,
      {
        'button--glow': glow,
        'button--loading': loading,
        'button--disabled': disabled,
        'button--full-width': fullWidth
      }
    ]"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
  >
    <span class="button-border"></span>
    <span class="button-glow"></span>
    
    <span class="button-content">
      <span v-if="$slots.icon || icon" class="button-icon">
        <slot name="icon">
          <el-icon v-if="icon"><component :is="icon" /></el-icon>
        </slot>
      </span>
      
      <span v-if="$slots.default" class="button-text">
        <slot />
      </span>
      
      <span v-if="loading" class="button-loading">
        <span class="loading-dot"></span>
        <span class="loading-dot"></span>
        <span class="loading-dot"></span>
      </span>
    </span>
  </button>
</template>

<style lang="scss" scoped>
.button {
  position: relative;
  border: none;
  background: transparent;
  padding: 10px 24px;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-transform: uppercase;
  outline: none;

  &--full-width {
    width: 100%;
  }

  // Types
  &--primary {
    background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
    color: white;

    .button-border {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  &--secondary {
    background: var(--bg-card);
    color: var(--text);

    .button-border {
      border: 1px solid var(--border);
    }
  }

  &--outline {
    background: transparent;
    color: var(--glow);

    .button-border {
      border: 1px solid var(--border);
    }
  }

  &--danger {
    background: linear-gradient(45deg, var(--color-negative), #ff4d8d);
    color: white;

    .button-border {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  &--success {
    background: linear-gradient(45deg, var(--color-positive), #00ffaa);
    color: white;

    .button-border {
      border: 1px solid rgba(255, 255, 255, 0.2);
    }
  }

  // Sizes
  &--small {
    padding: 6px 16px;
    font-size: 0.8rem;
  }

  &--medium {
    padding: 10px 24px;
    font-size: 0.9rem;
  }

  &--large {
    padding: 14px 32px;
    font-size: 1rem;
  }

  // States
  &--glow {
    box-shadow: 0 0 20px rgba(var(--glow-rgb), 0.3);

    &:hover {
      box-shadow: 0 0 30px rgba(var(--glow-rgb), 0.5);
    }
  }

  &--loading {
    opacity: 0.8;
    cursor: not-allowed;
  }

  &--disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:hover:not(.button--disabled):not(.button--loading) {
    transform: translateY(-2px);
    filter: brightness(1.1);
  }

  &:active:not(.button--disabled):not(.button--loading) {
    transform: translateY(0);
  }

  .button-border {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    pointer-events: none;
  }

  .button-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(var(--glow-rgb), 0.3) 0%,
      transparent 70%
    );
    transform: translate(-50%, -50%);
    transition: all 0.4s ease;
    pointer-events: none;
  }

  &:hover .button-glow {
    width: 200%;
    height: 200%;
  }

  .button-content {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .button-icon {
    display: flex;
    align-items: center;
    
    .el-icon {
      font-size: 1.1em;
    }
  }

  .button-text {
    white-space: nowrap;
  }

  .button-loading {
    display: flex;
    align-items: center;
    gap: 4px;

    .loading-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
      animation: loadingDot 1.4s ease-in-out infinite;

      &:nth-child(2) {
        animation-delay: 0.2s;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
      }
    }
  }
}

@keyframes loadingDot {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.3;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>