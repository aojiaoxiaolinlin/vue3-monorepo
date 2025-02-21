<script setup lang="ts">
import SideBar from "#/components/SideBar.vue";

useHead({
  title: "DeepSeek R1",
});
</script>

<template>
  <div
    h-screen
    flex
  >
    <SideBar w-65 />
    <RouterView flex-1 />
  </div>
</template>
