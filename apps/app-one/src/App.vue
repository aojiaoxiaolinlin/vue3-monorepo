<script setup lang="ts">
import HelloWorld from "#/components/HelloWorld.vue";
import { Button, MyModal, ShowMessage } from "@lin/component_one";
import { objectIsEmpty } from "@lin/utils";
import { useUserQuery } from "./graphql";

useHead({
  title: "移动端H5例子",
});
const variable = reactive({ id: "1" });
const { result, loading } = useUserQuery(variable);

console.log("env", import.meta.env);
const value = ref("");
const isShow = ref(false);
function showMessage() {
  ShowMessage("命令式组件", () => {
    console.log("关闭");
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
  <span text-emerald>{{ result }}--{{ loading }}</span>
  <p>可以观察到，当参数发生变化，graphQL会自动发出请求，并且有防抖机制</p>
  <button @click="variable.id += '2'">
    graphQL
  </button>
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
