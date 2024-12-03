<script setup lang="ts">
import { onMounted } from 'vue';
import { getPublicKey, getTestData } from '#/api';
import HelloWorld from '#/components/HelloWorld.vue';
import { sign, sortRequestData, verify } from './utils/RsaUtil';

onMounted(() => {
  const data: { [key: string]: unknown } = {
    z: '回复',
    2: '2',
    a: '哈哈',
    1: '1',
    c: 123,
    b: Date.now().toString(),
    hh: {
      c: 123,
      b: Date.now().toString(),
    },
    g: 'ggggggggggg',
  };
  getTestData(data);
});
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
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
