<template>
  <div>
    <h1>四川方言</h1>
    <article>monorepo工程测试页面</article>
  </div>
</template>

<script setup lang="ts">
import { wxLoginGetUserInfo } from '@lin/utils';
import { useRouteQuery } from '@vueuse/router';
import type { UserPhoneInfo } from '#/api';
import { useGameStore } from '#/stores/game-store';

const weiChatKey = useRouteQuery('key');
const token = useRouteQuery('data');
console.log(weiChatKey.value);
console.log(token.value);
const gameStore = useGameStore();

let phone = '';
if (weiChatKey.value) {
  phone = wxLoginGetUserInfo(weiChatKey.value as string).productNo;
}
const userPhoneInfo: UserPhoneInfo = {
  phone,
  token: token.value as string,
};
gameStore.initGameCount(userPhoneInfo);

console.log(phone)
</script>
