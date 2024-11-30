<script setup lang="ts">
import helloworld from "./components/HelloWorld.vue";
import { add, Button } from "@lin/component_one";

console.log(add(1, 2));

import { ref } from "vue";

const count = ref(0);
</script>

<template>
  <Button />
  <HelloWorld msg="Vite + Vue" />
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
