<template>
  <div>
    <div class="header">
      <van-icon name="arrow-left" size="30" @click="router.go(-1)" /><span>奖品列表</span>
    </div>
    <div class="search-box">
      <van-search v-model="value" placeholder="请输入搜索关键词" @search="onSearch" />
      <button @click="onSearch">搜索</button>
    </div>
  </div>
  <div class="coupon-list">
    <van-loading class="loading" v-if="isLoading" />
    <div class="box">
      <div v-for="(item, index) of couponData.list" :key="index" @click="userGetGoodsCouponOrToUse(item.aid)">
        <img :src="getAssetCouponImage(item.src)" :alt="item.name" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCouponsStatus } from '#/composables/coupon-status';
import { useGameStore } from '#/stores';
import { getAssetCouponImage } from '#/utils';
import { goodsCategories } from './data';

type ShowCouponInfo = {
  aid: string;
  src: string;
  name: string;
  url: string;
};

const router = useRouter();
const gameStore = useGameStore();

const value = ref('');
const isLoading = ref(false);
const couponData = ref<{
  list: ShowCouponInfo[];
}>({
  list: [],
});

let coupons: ShowCouponInfo[] = [];

const onSearch = () => {
  console.log('搜索', value.value);
  if (value.value) {
    // 搜索
    couponData.value.list = coupons.filter((item) => item.name.includes(value.value));
  } else {
    // 获取全部
    couponData.value.list = coupons;
  }
};

const userGetGoodsCouponOrToUse = (aid: string) => {
  window.location.href = coupons.find((item) => item.aid === aid)?.url ?? '';
};

onMounted(async () => {
  // 获取奖品列表
  // 获取当前时间
  const start = Date.now();
  isLoading.value = true;
  coupons = await getCouponsStatus(gameStore.getUserPhoneApiInfo, goodsCategories);
  isLoading.value = false;
  const end = Date.now();
  console.log('获取奖品列表耗时', end - start, 'ms');
  couponData.value.list = coupons;
})
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 30px;
  font-size: 10px;
  background-color: #fff;
}

.header img {
  width: 25px;
  height: 25px;
}

.header span {
  flex: 1;
  font-size: 24px;
  text-align: center;
}

.coupon-list {
  width: 100%;
  height: calc(100vh - 100px);
  padding-top: 10px;
  overflow: hidden scroll;
  background-image: url('../assets/images/CouponList/bg.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100% 100%;
}

.coupon-list .loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.search-box {
  display: flex;
  align-items: center;
  padding: 5px 10px;
}

.van-search {
  flex: 1;
}

.search-box button {
  height: 30px;
  font-size: 18px;
  color: white;
  background: linear-gradient(to bottom, #fc686f, #ff934c);
  border: none;
  border-radius: 5px;
}

.search-box button:active {
  /* 加个不透明度 */
  opacity: 0.8;
}

.box {
  width: 90%;
  margin: 0 auto;
}
</style>
