<script setup lang="ts">
import DemoPage from "#/layouts/demo-page.vue";
import { Button, MyModal, ShowMessage } from "@lin/component_one";

const isShow = ref(false);
function showMessage() {
  ShowMessage("命令式组件", () => {
    console.log("关闭");
  });
}
</script>

<template>
  <DemoPage>
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
  </DemoPage>
</template>
