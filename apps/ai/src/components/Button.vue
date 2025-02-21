<script lang="ts" setup>
defineSlots<{ default: () => null }>();
</script>

<template>
  <button
    h-9
    rounded-md
    bg-primary
    px-4
    py-2
    text-sm
    text-primary-foreground
    font-medium
    shadow-sm
    transition-color
    hover="bg-primary/90"
  >
    <slot />
  </button>
</template>
