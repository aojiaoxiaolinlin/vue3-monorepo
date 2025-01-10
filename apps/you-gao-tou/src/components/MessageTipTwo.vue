<template>
  <div class="message-box" v-if="mode">
    <div class="content">
      <img :src="props.bgImg || DefaultBgImg" alt="背景" />
      <div class="is-sub-box">
        <div class="title-box">{{ props.title }}</div>
        <div class="first-content" v-if="props.firstContent">
          <p v-html="props.firstContent"></p>
        </div>
        <div class="sub-text" :style="`text-align: ${props.textAlign};`">
          <span v-html="props.content"></span>
          <div v-if="confirmBtn" class="confirm-box" @click="onConfirm">
            <img :src="confirmBtn" alt="确认" />
          </div>
        </div>
      </div>
      <div class="close-btn" @click="onClose">
        <img src="../assets/images/close.png" alt="关闭" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultBgImg from '#/assets/images/fan-fan/mini_message_bg.png';
const mode = defineModel({ type: Boolean, default: true });

const props = withDefaults(defineProps<{
  title: string,
  content: string,
  textAlign?: 'center' | 'left' | 'right',
  confirmBtn?: string,
  bgImg?: string,
  firstContent?: string,
}>(), {
  title: '提示',
  content: 'center',
});

const emit = defineEmits<{
  close: [],
  confirm: [],
}>();


const onClose = () => {
  mode.value = false;
  emit('close');
}

const onConfirm = () => {
  mode.value = false;
  emit('confirm');
}

</script>

<style scoped>
.message-box {
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
  width: 300px;
  height: auto;
  padding: 0 10px;
  border-radius: 15px;
  transform: translate(-50%, -50%);
}

.is-sub-box {
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  min-height: 280px;
  overflow: hidden;
  transform: translate(-50%, -50%);
}

.title-box {
  width: 100%;
  height: 54px;
  margin-top: -5px;
  font-size: 24px;
  font-weight: bold;
  line-height: 54px;
  color: white;
  text-align: center;
}

.first-content {
  width: 100%;
  height: auto;
  margin: 20px auto 0;
  font-size: 20px;
  font-weight: 800;
  color: #f86268;
  text-align: center;
}

.is-sub-box .sub-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 78%;
  margin: 6px auto 0;
  overflow: hidden;
  font-size: 12px;
  font-weight: 600;
  line-height: 1.6;
  color: #f86268;
  text-align: center;
  word-break: break-all;
}


.is-sub-box .confirm-box {
  width: 80%;
  margin: 60px auto 0;
}

.close-btn {
  position: absolute;
  bottom: -50px;
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
</style>
