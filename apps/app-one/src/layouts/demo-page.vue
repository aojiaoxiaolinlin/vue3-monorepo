<script setup lang="ts">
defineSlots <{
  default: () => null
}> ();
</script>

<template>
  <RouterLink
    border="rd 1 solid #ddd"
    px-1
    hover:border="#646ccf" to="/"
  >
    返回
  </RouterLink>
  <div
    text-center
    mt-1
  >
    <slot />
  </div>
</template>
