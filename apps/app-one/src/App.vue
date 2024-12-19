<script setup lang="ts">
import { onMounted, ref } from 'vue';
import HelloWorld from '#/components/HelloWorld.vue';


const list = ref([1, 2, 3, 4, 5]);
const key = import.meta.env.VITE_PUBLIC_KEY;
const value = ref('');
onMounted(() => {
  console.log(import.meta.env.VITE_PUBLIC_KEY);
});

</script>

<template>
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <div class="text-box">{{ list }}--{{ key }}</div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.text-box {
  color: red;
  word-wrap: break-word;
  background-color: aliceblue;
}
</style>
