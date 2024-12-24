<script setup lang="ts">
import { Button, MyModal, ShowMessage } from '@lin/component_one';
import { objectIsEmpty } from '@lin/utils';
import { getGameCountApi } from '#/api/test';
import HelloWorld from '#/components/HelloWorld.vue';

const list = ref([1, 2, 3, 4, 5]);
const key = import.meta.env.VITE_PUBLIC_KEY;
console.log('env', import.meta.env);
const value = ref('');
const isShow = ref(false);
// getGameCountApi()
function showMessage() {
  ShowMessage('命令式组件', () => {
    console.log('关闭');
  });
}

const userInfo = { token: null, phone: null };
console.log(objectIsEmpty(userInfo))

</script>

<template>
  <van-search v-model="value" placeholder="请输入搜索关键词" />
  <Button @click="isShow = true">打开Modal组件</Button>
  <Button @click="showMessage">打开Message组件</Button>
  <div class="text-box">{{ list }}--{{ key }}</div>
  <!-- <div><span>{{ objectIsEmpty(userInfo) }}</span></div> -->
  <MyModal v-model:isShow="isShow" message="Hello, World!" @onClose="console.log('close')" />
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.text-box {
  color: red;
  word-wrap: break-word;
  background-color: aliceblue;
}
</style>
