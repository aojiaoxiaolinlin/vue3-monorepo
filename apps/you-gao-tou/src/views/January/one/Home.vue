<template>
  <div class="box">
    <div class="scroll-box">
      <div class="content">
        <img
          src="../../../assets/images/chuan-pu/bg.png"
          alt=""
          srcset=""
        >
        <div
          class="rule-text"
          @click="isShowRuleInfo = true"
        >活动规则</div>
        <div
          class="my-coupons"
          @click="onGoSeeMyCoupons()"
        >奖品列表</div>
        <div
          class="start-btn-box"
          @click="onStartGame"
        >
          <img
            src="../../../assets/images/chuan-pu/start-btn.png"
            alt="开始游戏按钮"
          >
        </div>
      </div>
      <div class="goods-box">
        <div
          v-for="category in goodsCategories"
          :key="category.baseName"
          class="list-box"
        >
          <div class="top-box">
            <img
              :src="getAssetChuanPuImage(`${category.baseName}top.png`)"
              alt="顶部框"
            >
          </div>
          <div class="item-box">
            <div
              v-for="item in category.list"
              :key="item.aid"
              class="item"
              @click="userGetGoodsCouponOrToUse(item.aid, item.url, item.status)"
            >
              <img
                :src="getAssetsGoodsImage(item.src)"
                alt="商品图片"
              >
            </div>
          </div>
          <div class="bottom-box">
            <img
              src="../../../assets/images/chuan-pu/haowu-bottom.png"
              alt="下边框"
            >
          </div>
        </div>
        <div class="bottom-bg">
          <img
            src="../../../assets/images/chuan-pu/bottom_bg.png"
            alt=""
          >
          <span @click="onJump()" />
        </div>
      </div>
    </div>
  </div>
  <MessageTip
    v-model="isShowRuleInfo"
    title="游戏规则"
    :content="ruleContent"
    text-align="left"
  />
</template>

<script setup lang="ts">
import { objectIsEmpty, wxLoginGetUserInfo } from '@lin/utils';
import { useRouteQuery } from '@vueuse/router';
import { hasDailyStock, userGetCouponApi } from '#/api';
import ConfirmBtn from '#/assets/images/chuan-pu/confirm_btn.png';
import GoToUseBtn from '#/assets/images/chuan-pu/goto_use_btn.png';
import MessageTip from '#/components/MessageTip.vue';
import { getGoodsCouponStatus } from '#/composables/coupon-status';
import { ShowMessageTip } from '#/composables/message-tip';
import { useGameStore } from '#/stores';
import { getAssetChuanPuImage, getAssetsGoodsImage, getUserPhoneApiInfo } from '#/utils';
import { isActivityDate } from '#/utils/date';
import { CouponGetStatus, goodsCategories, ruleContent } from '../../common-data';
import { tipText } from './data';
// 1. 定义页面配置
useHead({
  title: '四川方言大挑战-检测是不是地道的四川人！'
})

// 2. 引入useXXX()
const router = useRouter();
const gameStore = useGameStore();
const weiChatKey = useRouteQuery<string>('key');
const token = useRouteQuery<string>('data');

// 3. 定义响应式变量，遵循就近使用原则
const isShowRuleInfo = ref(false);


// 4. 初始化
init();
// function 定义的函数具有提升性，因此可以在函数调用之后定义。
async function init() {
  let phone = '';
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
    getGoodsCouponStatus(goodsCategories)
  } else {
    console.log('用户信息为空');
  }

}


// 5. 定义函数
// 箭头函数定义的函数不具有提升性，因此必须在函数调用之前定义。否则会报错。必须严格遵守先定义后调用的原则。
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

const onStartGame = async () => {
  if (gameStore.isLogin) {
    // 1.判断游戏次数
    if (gameStore.gameCount <= 0) {
      ShowMessageTip({
        title: '糟糕，游戏次数已用完',
        content: '请期待下一场幸运翻翻乐活动吧！<br />活动时间：2025年1月28日'
      });
      return;
    }
    // 2.日期判断，测试时注释掉
    if (!isActivityDate()) {
      return;
    }
    // 3.库存判断
    const isDailyStock = await hasDailyStock()
    if (!isDailyStock) {
      ShowMessageTip({
        title: tipText.notStock.title,
        content: tipText.notStock.content,
      });
      return;
    }
    ShowMessageTip({
      title: '准备好了吗？',
      content: '由系统随机出1题，<br/>答对即有机会获得奖品！',
      confirm: {
        btnImg: ConfirmBtn,
        callback: () => {
          console.log('开始游戏');
          router.push({ path: '/question' });
        }
      }
    })
  } else {
    ShowMessageTip({
      title: '未登录',
      content: '请先退出后登录',
    })
  }
}

const userGetGoodsCouponOrToUse = (aid: string, url: string, status: CouponGetStatus) => {
  switch (status) {
    case CouponGetStatus.GET:
      userGetCouponApi(aid).then(_res => {
        ShowMessageTip({
          title: '领取成功',
          content: '请在【活动首页-奖品列表】中查询。',
          confirm: {
            btnImg: GoToUseBtn,
            callback: () => {
              router.push({ path: '/coupons' });
            }
          },
          close: () => {
            // 刷新状态
            getGoodsCouponStatus(goodsCategories);
          }
        });
      }).catch(err => {
        console.log('err', err);
      });
      break;
    case CouponGetStatus.USE:
      window.location.href = url;
      break;
  }
}

const onJump = () => {
  window.location.href =
    'https://h5.bestpay.com.cn/subapps/financial/index.html#/pmActivityHome?equityActiType=GJ1168396538&routeOfferinstType=1&special_variable3=001012LH202303232&hybridVersion=3.0';
}
</script>

<style scoped>
.box {
  width: 100%;
  height: 100vh;
  overflow: hidden auto;
  background-color: #88cbff;
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

.start-btn-box {
  position: absolute;
  top: 88%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.goods-box {
  margin-top: -10px;
}

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
  background-image: url('../../../assets/images/chuan-pu/haowu_center.png');
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
