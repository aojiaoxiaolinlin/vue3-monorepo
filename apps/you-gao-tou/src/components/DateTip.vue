<template>
  <div class="box" v-if="mode">
    <div class="content">
      <img :src="getAssetsDateImage(tipImg)" alt="日期提示" />
      <div class="close-btn" @click="onClose">
        <img src="../assets/images/close.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAssetsDateImage } from '#/utils';

const mode = defineModel({ type: Boolean });

const props = defineProps({
  num: {
    type: Number,
    default: 0,
  },
});
const emit = defineEmits(['close']);

const tipImg = ref('');
watchEffect(() => {
  if (mode.value) {
    console.log(props.num);
    if (props.num === 0) {
      tipImg.value = 'log_tip.png';
    } else if (props.num === 1) {
      tipImg.value = '17.png';
    } else if (props.num === 2) {
      tipImg.value = '24.png';
    } else if (props.num === 3) {
      tipImg.value = '31.png';
    } else {
      tipImg.value = 'log_tip.png';
    }
  }
});

const onClose = () => {
  mode.value = false;
  emit('close');
};
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
  width: 261px;
  height: auto;
  border-radius: 15px;
  transform: translate(-50%, -50%);
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
