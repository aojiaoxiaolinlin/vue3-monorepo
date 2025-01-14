<template>
  <div
    v-if="mode"
    class="box"
  >
    <div class="content">
      <img
        class="bg-box"
        :src="props.prizeInfo.isPrize ? PrizeTipImg : UnPrizeTipImg"
        alt="提示图片"
      >
      <template v-if="props.prizeInfo.isPrize">
        <div class="prize-name">
          <span>{{ props.prizeInfo.prizeName }}</span>
        </div>
        <div class="goto-box">
          <div
            class="use-btn"
            @click="goto()"
          >
            <img
              src="../assets/images/sure.png"
              alt=""
              srcset=""
            >
          </div>
        </div>
      </template>
      <div
        class="close-btn"
        @click="onClose"
      >
        <img
          src="../assets/images/close.png"
          alt="关闭"
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PrizeTipImg from '#/assets/images/prize_tip.png';
import UnPrizeTipImg from '#/assets/images/un_prize_tip.png';

const mode = defineModel({ type: Boolean });

type PrizeInfo = {
  prizeName: string;
  isPrize: boolean;
};

const props = defineProps<{
  prizeInfo: PrizeInfo;
}>();

const emit = defineEmits<{
  close: []
}>();

const onClose = () => {
  mode.value = false;
  emit('close');
};

const goto = () => {
  console.log('goto');
}

</script>

<style scoped>
.box {
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 100;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: rgb(0 0 0 / 80%);
  transform: translateX(-50%);
}

.content {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  width: 262px;
  height: 295px;
  transform: translate(-50%, -50%);
}

.content .bg-box {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
}

.content .prize-name {
  position: absolute;
  top: 110px;
  left: 50%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 20px;
  font-size: 11.2px;
  font-weight: 700;
  line-height: 1.5;
  color: #603414;
  text-align: center;
  transform: translateX(-50%);
}

.content .prize-name span {
  width: 80%;
}

.content .goto-box {
  position: absolute;
  bottom: 15px;
  left: 50%;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 51px;
  transform: translateX(-50%);
}

.content .goto-box .use-btn {
  display: flex;
  width: 110px;
  height: 51px;
  margin: 0 8px;
}

.close-btn {
  position: absolute;
  bottom: -80px;
  left: 50%;
  display: flex;
  width: 40px;
  height: 40px;
  transform: translateX(-50%);
}

.close-btn img {
  width: 100%;
  height: 100%;
}

.title-box {
  width: 100%;
  height: 54px;
  font-size: 15px;
  font-weight: 700;
  line-height: 54px;
  color: #dc2723;
  text-align: center;
  white-space: nowrap;
}
</style>
