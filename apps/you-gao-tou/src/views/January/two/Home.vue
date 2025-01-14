<template>
  <div class="box">
    <div class="scroll-box">
      <div class="content">
        <img src="../../../assets/images/fan-fan/bg.png" alt="" srcset="" />
        <div class="rule-text" @click="isShowRuleInfo = true">活动规则</div>
        <div class="my-coupons" @click="onGoSeeMyCoupons()">奖品列表</div>
        <div class="game-box">
          <div class="card-box" v-for="index in 9" :key="index">
            <div class="img-box" @click="onStartGame(index)">
              <img class="backend" :class="{ 'backend-rotate-y': index === clickCardIndex }"
                src="../../../assets/images/fan-fan/card_backend.png" alt="卡片" />
              <img class="font" :class="{ 'font-rotate-y': index === clickCardIndex }"
                :src="getAssetFanFanImage(couponPrize)" alt="卡片" />
            </div>
          </div>
        </div>
      </div>
      <div class="goods-box">
        <div class="list-box" v-for="category in goodsCategories" :key="category.baseName">
          <div class="top-box">
            <img :src="getAssetFanFanImage(`${category.baseName}top.png`)" alt="顶部框" />
          </div>
          <div class="item-box">
            <div class="item" v-for="item in category.list" :key="item.aid"
              @click="userGetGoodsCouponOrToUse(item.aid, item.url, item.status)">
              <img :src="getAssetsGoodsImage(item.src)" alt="商品图片" />
            </div>
          </div>
          <div class="bottom-box">
            <img src="../../../assets/images/fan-fan/haowu_bottom.png" alt="下边框" />
          </div>
        </div>
        <div class="bottom-bg">
          <img src="../../../assets/images/fan-fan/bottom_bg.png" alt="" />
          <span @click="onJump()"></span>
        </div>
      </div>
    </div>
  </div>
  <MessageTipTwo v-model="isShowRuleInfo" title="游戏规则" text-align="left" :content="ruleContent" :bg-img="MessageBg"
    :small-font-size="true" />
</template>

<script setup lang="ts">
import { objectIsEmpty, wxLoginGetUserInfo } from "@lin/utils";
import { useRouteQuery } from "@vueuse/router";
import { Subject, throttleTime } from "rxjs";
import { hasDailyStock, issuingCouponApi, userGetCouponApi } from "#/api";
import GotoLook from "#/assets/images/fan-fan/goto_look.png";
import MessageBg from "#/assets/images/fan-fan/message_bg.png";
import PrizeMessageBg from "#/assets/images/fan-fan/prize_message_bg.png";

import MessageTipTwo from "#/components/MessageTipTwo.vue";
import { getGoodsCouponStatus } from "#/composables/coupon-status";
import { ShowMessageTipTwo as ShowMessageTip } from "#/composables/message-tip";
import { useGameStore } from "#/stores";
import {
  getAssetFanFanImage,
  getAssetsGoodsImage,
  getUserPhoneApiInfo,
} from "#/utils";
import { isActivityDate } from "#/utils/date";
import {
  CouponGetStatus,
  awardCoupons,
  goodsCategories,
  ruleContent,
} from "../../common-data";
import { tipText } from "./data";

// 1. 定义页面配置
useHead({
  title: "幸运翻翻乐-翻出你的专属好礼",
});

// 2. 引入useXXX()
const router = useRouter();
const gameStore = useGameStore();
const weiChatKey = useRouteQuery<string>("key");
const token = useRouteQuery<string>("data");

// 3. 定义响应式变量，遵循就近使用原则
const isShowRuleInfo = ref(false);
const couponPrize = ref("not_prize_card.png");

// 4. 初始化
init();
// function 定义的函数具有提升性，因此可以在函数调用之后定义。
async function init() {
  let phone = "";
  if (weiChatKey.value) {
    phone = wxLoginGetUserInfo(weiChatKey.value).productNo;
  }
  const userPhoneInfo = {
    phone,
    token: token.value,
  };

  if (!objectIsEmpty(userPhoneInfo)) {
    const userPhoneApiInfo = getUserPhoneApiInfo(userPhoneInfo);
    gameStore.initUserPhoneApiInfo(userPhoneApiInfo);
    await gameStore.initGameCount(userPhoneApiInfo);
    getGoodsCouponStatus(goodsCategories);
  } else {
    console.log("用户信息为空");
  }
}

// 5. 定义函数
// 箭头函数定义的函数不具有提升性，因此必须在函数调用之前定义。否则会报错。必须严格遵守先定义后调用的原则。
const onGoSeeMyCoupons = () => {
  if (gameStore.isLogin) {
    router.push({ path: "/coupons" });
  } else {
    ShowMessageTip({
      title: "未登录",
      content: "请先退出后登录",
    });
  }
};

const subject = new Subject<number>();
const clickCardIndex = ref(-1);

subject.pipe(throttleTime(2000)).subscribe(async (index) => {
  // 3.库存判断
  const isDailyStock = await hasDailyStock();
  if (!isDailyStock) {
    ShowMessageTip({
      title: tipText.notStock.title,
      content: tipText.notStock.content,
    });
    return;
  }
  setTimeout(() => {
    clickCardIndex.value = index;
  }, 150);
  // 发券
  issuingCouponApi().then((res) => {
    const prizeAid = res;
    if (prizeAid === "0") {
      couponPrize.value = "not_prize_card.png";
      setTimeout(() => {
        ShowMessageTip({
          title: "很遗憾",
          firstContent: "此卡未藏惊喜，<br />别灰心，好运在排队！",
          content:
            gameStore.gameCount > 0
              ? "再玩一次吧！"
              : "下一场活动将在<br />2025年1月21日准时开启，记得来参加哟。",
        });
      }, 1100);
    } else {
      for (const item of awardCoupons) {
        if (item.aid === prizeAid) {
          couponPrize.value = item.name.includes("3元")
            ? "3yuan_card.png"
            : "5yuan_card.png";
          setTimeout(() => {
            ShowMessageTip({
              title: "太棒啦！",
              firstContent: `翻开即中${item.name}！`,
              bgImg: PrizeMessageBg,
              content: "请在【活动首页-奖品列表】中查询。",
              confirm: {
                btnImg: GotoLook,
                callback: () => {
                  router.push("/coupons");
                },
              },
            });
          }, 1000);
          break;
        }
      }
    }
    gameStore.updateGameCount();
  });
});

const onStartGame = async (index: number) => {
  if (gameStore.isLogin) {
    // 1.判断游戏次数
    if (gameStore.gameCount <= 0) {
      ShowMessageTip({
        title: "糟糕，游戏次数已用完",
        content:
          "请期待下一场<br />四川方言大挑战活动吧！<br />活动时间：2025年1月21日",
        bigFontSize: true,
      });
      return;
    }
    // 2.日期判断，测试时注释掉
    if (!isActivityDate()) {
      return;
    }
    subject.next(index);
  } else {
    ShowMessageTip({
      title: "未登录",
      content: "请先退出后登录",
    });
  }
};

const userGetGoodsCouponOrToUse = (
  aid: string,
  url: string,
  status: CouponGetStatus,
) => {
  switch (status) {
    case CouponGetStatus.GET:
      userGetCouponApi(aid)
        .then((_res) => {
          ShowMessageTip({
            title: "领取成功",
            content: "请在【活动首页-奖品列表】中查询。",
            confirm: {
              btnImg: GotoLook,
              callback: () => {
                router.push({ path: "/coupons" });
              },
            },
            close: () => {
              // 刷新状态
              getGoodsCouponStatus(goodsCategories);
            },
          });
        })
        .catch((err) => {
          console.log("err", err);
        });
      break;
    case CouponGetStatus.USE:
      window.location.href = url;
      break;
  }
};

const onJump = () => {
  window.location.href =
    "https://h5.bestpay.com.cn/subapps/financial/index.html#/pmActivityHome?equityActiType=GJ1168396538&routeOfferinstType=1&special_variable3=001012LH202303232&hybridVersion=3.0";
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100vh;
  overflow: hidden auto;
  background-color: #ff945d;
}

.scroll-box {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  background-size: 100% auto;
}

.content {
  position: relative;
}

.content .game-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 0;
  justify-content: space-between;
  width: 66%;
  margin-top: 46px;
  transform: translate(-50%, -50%);
}

.content .game-box .card-box {
  width: 22%;
  margin: 0 4px;
  transition: transform 0.6s;
}

.img-box {
  position: relative;
}

.backend {
  backface-visibility: hidden;
  transition: transform 0.6s;
  transform: rotateY(0deg);
}

.backend-rotate-y {
  transform: rotateY(180deg);
}

.font {
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
  transition: transform 0.6s;
  transform: rotateY(180deg);
}

.font-rotate-y {
  transform: rotateY(0deg);
}

.goods-box {
  margin-top: -6px;
}

.list-box {
  width: 100%;
  height: auto;
  margin-bottom: 12px;
  overflow: hidden;
}

.top-box,
.bottom-box {
  display: flex;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.item-box {
  width: 100%;
  height: auto;
  overflow: hidden;
  background-image: url('../../../assets/images/fan-fan/haowu_center.png');
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

.item-box .item:last-child {
  margin-bottom: 0;
}

.bottom-bg span {
  position: absolute;
  bottom: 60px;
  left: 50%;
  display: block;
  width: 50%;
  height: 40px;
  transform: translateX(-50%);
}

.rule-text,
.my-coupons {
  position: absolute;
  right: 0;
  width: 60px;
  height: 28px;
  font-size: 12px;
  line-height: 30px;
  color: #fff;
  text-align: center;
  background-color: rgb(0 0 0 / 60%);
  border-radius: 5px;
}

.rule-text {
  top: 160px;
}

.my-coupons {
  top: 190px;
}
</style>
