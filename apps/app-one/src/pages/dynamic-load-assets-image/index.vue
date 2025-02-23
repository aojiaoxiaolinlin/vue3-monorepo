<script setup lang="ts">
import imageUrl from "#/assets/images/btn2.png";
import DemoPage from "#/layouts/demo-page.vue";
import { getAssetsFile } from "#/utils/load-images";

const count = ref(0);
</script>

<template>
  <DemoPage>
    <button @click="count++">
      动态加载 {{ count }}
    </button>
    <img
      :src="count % 2 === 0 ? getAssetsFile('btn2.png') : getAssetsFile('z-pan-ding.png')"
      alt=""
      srcset=""
    >
    <img
      :src="imageUrl"
      alt=""
      srcset=""
    >
  </DemoPage>
</template>
