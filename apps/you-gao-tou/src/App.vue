<script setup lang="ts">
import { onMounted } from 'vue';
import Home from '#/views/Home.vue';
onMounted(() => {});
</script>

<template>
  <Home />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  transition: filter 300ms;
  will-change: filter;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
