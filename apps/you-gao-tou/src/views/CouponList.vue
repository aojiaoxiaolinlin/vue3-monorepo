<template>
  <div>
    <div class="header">
      <van-icon
        name="arrow-left"
        size="30"
        @click="router.go(-1)"
      /><span>奖品列表</span>
    </div>
    <div class="search-box">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="onSearch"
      />
      <button @click="onSearch">搜索</button>
    </div>
  </div>
  <div class="coupon-list">
    <van-loading
      v-if="isLoading"
      class="loading"
    />
    <div class="box">
      <div
        v-for="(item, index) of couponData.list"
        :key="index"
        @click="userGetGoodsCouponOrToUse(item.aid, item.arriveStatus, item.resultOld, item.resultMsg)"
      >
        <img
          :src="getAssetCouponImage(item.src)"
          :alt="item.name"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { userGetCouponAgainApi } from "#/api";
import GetCouponAgainBtnImg from "#/assets/images/coupon-list/get_coupon_again.png";
import MessageBgImg from "#/assets/images/fan-fan/prize_message_bg.png";
import {
  CouponArriveStatus,
  type ShowCouponInfo,
  getCouponsStatus,
} from "#/composables/coupon-status";
import { ShowMessageTipTwo as ShowMessageTip } from "#/composables/message-tip";
import { getAssetCouponImage } from "#/utils";
import { goodsCategories } from "./common-data";

const router = useRouter();

const value = ref("");
const isLoading = ref(false);
const couponData = ref<{ list: ShowCouponInfo[] }>({
  list: [],
});

let coupons: ShowCouponInfo[] = [];

const onSearch = () => {
  if (value.value) {
    // 搜索
    couponData.value.list = coupons.filter((item) => item.name.includes(value.value));
  } else {
    // 获取全部
    couponData.value.list = coupons;
  }
};

const initCouponsStatus = async () => {
  isLoading.value = true;
  coupons = await getCouponsStatus(goodsCategories);
  isLoading.value = false;
  couponData.value.list = coupons;
};

const userGetGoodsCouponOrToUse = (
  aid: string,
  arriveStatus: CouponArriveStatus,
  resultOld: string,
  resultMsg: string
) => {
  switch (arriveStatus) {
    case CouponArriveStatus.NOT_ARRIVE: {
      // 未到账
      let tipMsg = '';
      switch (resultMsg) {
        case "亲，用户不存在，请重新输入或注册新账号":
        case "失败：手机号信息不存在":
          tipMsg = "由于账号状态、活动规则限制或券量不足等原因<br /> 导致优惠券未到账，请下次再来试试吧！";
          break;
        case "优惠券领取已结束":
          tipMsg = "您来晚一步，优惠券已领完<br />别灰心，后续还有更多惊喜福利等您来享！";
          break;
        default:
        tipMsg = "您的登录异常<br />请尝试重新登录或注册新账号试试～<br />";
      }
      ShowMessageTip({
        title: "未到账",
        firstContent: "亲爱的小伙伴",
        content: tipMsg,
        bgImg: MessageBgImg,
        confirm: {
          btnImg: GetCouponAgainBtnImg,
          callback: () => {
            userGetCouponAgainApi(resultOld)
              .then((res) => {
                console.log("res", res);
                // 更新奖品列表
                initCouponsStatus();
              })
              .catch((err) => {
                console.log("err", err);
              });
          }
        }
      })
      break;
    }
    case CouponArriveStatus.ARRIVE:
      // 已到账
      window.location.href = coupons.find((item) => item.aid === aid)?.url ?? "";
      break;
  }
};

onMounted(async () => {
  initCouponsStatus();
});
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
  background-image: url('../assets/images/coupon-list/bg.png');
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
