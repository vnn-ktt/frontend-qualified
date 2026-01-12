<script setup lang="ts">
</script>
<template>
  <svg
      class="shuttle-icon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
  >
    <path
        d="M12 3L6 7V17L12 21L18 17V7L12 3Z"
        fill="none"
        stroke="cyan"
        stroke-width="1.5"
    />
    <circle
        cx="12"
        cy="9"
        r="2"
        fill="cyan"
        filter="url(#minimal-glow)"
    />
    <path
        d="M8 11L5 12L8 13M16 11L19 12L16 13"
        stroke="cyan"
        stroke-width="1"
        stroke-linecap="round"
    />
    <path
        d="M11 19L11 21M13 19L13 21"
        stroke="#00FFFF"
        stroke-width="2"
        stroke-linecap="round"
    />

    <defs>
      <filter id="minimal-glow">
        <feGaussianBlur stdDeviation="1" result="blur" />
        <feFlood flood-color="cyan" flood-opacity="0.6" />
        <feComposite operator="in" in2="blur" />
        <feMerge>
          <feMergeNode />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>
  </svg>
</template>