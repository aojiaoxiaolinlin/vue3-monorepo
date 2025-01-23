<script setup lang="ts">
import { Button, MyModal, ShowMessage } from '@lin/component_one';
import { objectIsEmpty } from '@lin/utils';
import HelloWorld from '#/components/HelloWorld.vue';

useHead({
  title:'移动端H5例子',
})

console.log('env', import.meta.env);
const value = ref('');
const isShow = ref(false);
function showMessage() {
  ShowMessage('命令式组件', () => {
    console.log('关闭');
  });
}

const userInfo = { token: null, phone: null };
console.log(objectIsEmpty(userInfo));
</script>

<template>
  <div
    h-100px
    w-100px
    bg-red
  />
  <van-search
    v-model="value"
    placeholder="请输入搜索关键词"
  />
  <Button @click="isShow = true">打开Modal组件</Button>
  <Button @click="showMessage">打开Message组件</Button>
  <!-- <div><span>{{ objectIsEmpty(userInfo) }}</span></div> -->
  <MyModal
    v-model:isShow="isShow"
    message="Hello, World!"
    @onClose="console.log('close')"
  />
  <HelloWorld msg="Vite + Vue" />
</template>
