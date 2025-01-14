<template>
  <div ref="box" class="box">
    <span class="ball"></span>
  </div>
</template>

<script setup lang="ts">
const box = ref<HTMLElement | null>(null);

onMounted(() => {
  if (box.value) {
    console.log(box.value.getBoundingClientRect());
  }
});
</script>

<style scoped>
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5.4rem;
  height: 5.4rem;
  margin: 0 auto;
  background-color: #ff945d;
  border-radius: 100%;
}

.ball {
  position: relative;
  display: inline-block;
  width: 1.4rem;
  height: 1.4rem;
  background-color: red;
  border-radius: 100%;
}
</style>
