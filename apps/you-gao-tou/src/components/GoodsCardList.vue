<template>
  <div
    class="list-box"
    :style="isMb ? 'margin-bottom: 0.66667rem;' : ''"
  >
    <div class="top-box">
      <img
        :src="getAssetsCardListImage(`${category.baseName}top.png`)"
        alt="顶部框"
      >
    </div>
    <div
      class="item-box"
      :style="`background-image: url(${getAssetsCardListImage(`${category.baseName}center.png`)});`
      "
    >
      <div
        v-for="item in category.list"
        :key="item.aid"
        class="item"
        @click="emit('userGetGoodsCouponOrToUse', item.aid);"
      >
        <img
          :src="getAssetsGoodsImage(item.src)"
          alt="商品图片"
        >
      </div>
    </div>
    <div class="bottom-box">
      <img
        :src="getAssetsCardListImage(`${category.baseName}bottom.png`)"
        alt="下边框"
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAssetsCardListImage, getAssetsGoodsImage } from '#/utils';
import type { GoodsCategory } from '#/views/common-data';

withDefaults(defineProps<{
  category: GoodsCategory;
  isMb?: boolean;
  useBaseNameCenterAndBottom?: boolean;
}>(), {
  isMb: false,
  useBaseNameCenterAndBottom: true,
})
const emit = defineEmits(['userGetGoodsCouponOrToUse']);

</script>

<style scoped>
.list-box {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.top-box,
.bottom-box {
  display: flex;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.top-box img,
.bottom-box img {
  width: 100%;
  height: 100%;
}

.item-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}

.item-box .item {
  width: 81%;
  height: auto;
  margin: 0 auto 10px;
  margin-top: 5px;
  overflow: hidden;
}

.content .item:last-child {
  margin-bottom: 0;
}
</style>
