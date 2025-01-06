<template>
  <div class="box">
    <div class="top-box" @click="router.go(-1)">
      <span>返回首页</span>
    </div>
    <div class="question-box">
      <img src="../../assets/images/chuan-pu/question_bg.png" alt="">
      <div class="question-content">
        四川方言<span>{{ question.question }}</span>是什么意思？
      </div>
      <img class="mini-title" src="../../assets/images/chuan-pu/mini_title.png" alt="小标题">
    </div>
    <div class="option-box-list">
      <div class="option-box" v-for="(option, index) in question.options" :key="option" @click="onSelectOption(index)">
        <img :src="getAssetChuanPuImage(`${updateOptionImage(index)}${String.fromCharCode(65 + index)}.png`)"
          alt="选项图片" />
        <span>{{ option }}</span>
      </div>
    </div>
    <div class="countdown-box" v-show="countdownShow">
      <van-count-down ref="countdown" :time="time" format="ss 秒" @finish="onFinish">
        <template #default="timeData">
          <span>{{ timeData.seconds }} 秒后进入下一题</span>
        </template>
      </van-count-down>
    </div>
  </div>
</template>

<script setup lang="ts">
import { issuingCouponApi } from '#/api';
import GoToUseBtn from '#/assets/images/chuan-pu/goto_use_btn.png';
import { ShowMessageTip } from '#/composables/message-tip';
import { useGameStore } from '#/stores';
import { getAssetChuanPuImage } from '#/utils';
import { awardCoupons } from '../common-data';
import { tipText, useQuestion } from './data';

const router = useRouter();
const gameStore = useGameStore();
const { getOneQuestion, getOneQuestionByIndex } = useQuestion();

const question = ref(getOneQuestion());
const answerIndex = ref(-1);
const countdown = ref();
const countdownShow = ref(false)
const time = ref(3 * 1000);
let result = false;

checkGameCount();

const onSelectOption = async (index: number) => {
  answerIndex.value = index;
  if (question.value.options[index] === question.value.answer) {
    // 替换为正确图片
    result = true;
    issuingCouponApi().then((res) => {
      const prizeAid = res.data.data.data;
      if (prizeAid === "0") {
        ShowMessageTip({
          title: tipText.notStock.title,
          content: tipText.notStock.content,
          close: () => {
            router.back();
          }
        });
      }
      else {
        for (const item of awardCoupons) {
          if (item.aid === prizeAid) {
            ShowMessageTip({
              title: '挑战成功',
              content: `恭喜您获得${item.name}！<br />请在【活动首页-奖品列表】中查询。`,
              confirm: {
                btnImg: GoToUseBtn,
                callback: () => {
                  router.push('/coupons');
                }
              }
            })
            break;
          }
        }
      }
      gameStore.updateGameCount();
    });

  } else {
    result = false;
    // 减少游戏次数
    await gameStore.decrementGameCount();
    if (gameStore.gameCount > 0) {
      countdown.value.reset();
      countdown.value.start();
      countdownShow.value = true;
    }
    if (gameStore.gameCount <= 0) {
      ShowMessageTip({
        title: '挑战失败',
        content: '3次游戏机会已用完，下次再战，雄起！<br/>下一场活动将在2025年1月14日准时开启<br />记得来参加哟~',
        close: () => {
          router.go(-1);
        }
      })
    }
    console.log('回答错误');
  }
}
const updateOptionImage = (index: number) => {
  if (answerIndex.value === index) {
    return result ? 'green-' : 'red-';
  }
  return '';
}

function checkGameCount() {
  if (gameStore.gameCount <= 0) {
    router.go(-1);
  }
}
function onFinish() {
  countdownShow.value = false;
  // 换题
  question.value = getOneQuestionByIndex();
  answerIndex.value = -1;
}

const pause = () => {
  countdown.value.pause();
};

onMounted(() => {
  pause();

})
</script>

<style scoped>
.box {
  width: 100%;
  height: 100vh;
  overflow: hidden auto;
  background-color: #88cbff;
}

.top-box {
  margin-top: 16px;
  margin-left: 20px;
  font-size: 16px;
  color: white;
}

.question-box {
  position: relative;
  width: 90%;
  height: auto;
  margin: 0 auto;
}

.question-content {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 86%;
  font-size: 20px;
  word-break: keep-all;
  transform: translate(-50%, -50%);
}

.question-content span {
  margin-right: 10px;
  margin-left: 10px;
  font-size: 24px;
  font-weight: bold;
}

.mini-title {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 80%;
  margin-bottom: -10px;
  transform: translateX(-50%);
}

.option-box-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  width: 90%;
  height: auto;
  margin: 0 auto;
  margin-top: 40px;
  overflow: hidden;
}

.option-box {
  position: relative;
}

.option-box span {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: 5px;
  font-size: 16px;
  transform: translate(-50%, -50%);
}

.countdown-box {
  margin-top: 30px;
  text-align: center;
}
</style>
