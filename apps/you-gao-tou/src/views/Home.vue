<template>

  <div>
    <h1>四川方言</h1>
    <h2>monorepo工程测试页面</h2>
    <MessageTip
      v-model="isShowRuleInfo"
      title="游戏规则"
      :content="ruleContent"
      textAlign="left"
    />

    <button @click="onShowMessage">弹窗Message</button>
    <button @click="isShowRuleInfo = !isShowRuleInfo">显示/隐藏规则</button>
    <button @click="onGoSeeMyCoupons">查看我的奖品</button>
    <GoodsCardList
      v-for="category in goodsCategories"
      :key="category.baseName"
      :category="category"
    />
  </div>
</template>

<script setup lang="ts">
import { objectIsEmpty, wxLoginGetUserInfo } from '@lin/utils';
import { useRouteQuery } from '@vueuse/router';
import GoodsCardList from '#/components/GoodsCardList.vue';
import MessageTip from '#/components/MessageTip.vue';
import { ShowMessageTip } from '#/composables/message-tip';
import { useGameStore } from '#/stores';
import { getUserPhoneApiInfo } from '#/utils';
import { goodsCategories, ruleContent } from './common-data';

const router = useRouter();
const gameStore = useGameStore();

const weiChatKey = useRouteQuery('key');
const token = useRouteQuery('data');

let phone = '';
if (weiChatKey.value) {
  phone = wxLoginGetUserInfo(weiChatKey.value as string).productNo;
}
const userPhoneInfo = {
  phone,
  token: token.value as string,
};

if (!objectIsEmpty(userPhoneInfo)) {
  const userPhoneApiInfo = getUserPhoneApiInfo(userPhoneInfo);
  gameStore.initUserPhoneApiInfo(userPhoneApiInfo);
} else {
  console.log('用户信息为空');
}
const isShowRuleInfo = ref(true);

const onShowMessage = () => {
  ShowMessageTip({
    title: '命令式触发提示',
    content: '这是一个提示信息',
  });
};

const onGoSeeMyCoupons = () => {
  if (gameStore.isLogin) {
    router.push({ path: '/coupons' });
  } else {
    ShowMessageTip({
      title: '未登录',
      content: '请先退出后登录',
    })
  }
};
</script>
