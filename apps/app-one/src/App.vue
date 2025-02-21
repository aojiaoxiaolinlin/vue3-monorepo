<script setup lang="ts">
import HelloWorld from "#/components/HelloWorld.vue";
import { MyModal, ShowMessage } from "@lin/component_one";
import { objectIsEmpty } from "@lin/utils";

useHead({
  title: "移动端H5例子",
});

console.warn("env", import.meta.env);
const value = ref("");
const isShow = ref(false);
function showMessage() {
  ShowMessage("命令式组件", () => {
    console.info("关闭");
  });
}

const userInfo = { token: null, phone: null };
console.warn(objectIsEmpty(userInfo));
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
  <Button @click="isShow = true">
    打开Modal组件
  </Button>
  <Button @click="showMessage">
    打开Message组件
  </Button>
  <MyModal
    v-model:is-show="isShow"
    message="Hello, World!"
    @on-close="console.log('close')"
  />
  <HelloWorld msg="Vite + Vue" />
</template>
