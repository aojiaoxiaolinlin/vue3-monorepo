<template>
  <div class="message-box" v-if="mode">
    <div class="content">
      <div class="is-sub-box">
        <div class="title-box">{{ props.title }}</div>
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
const mode = defineModel({ type: Boolean, default: true });

const props = withDefaults(defineProps<{
  title: string,
  content: string,
  textAlign?: 'center' | 'left' | 'right',
  confirmBtn?: string,
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
  min-height: 300px;
  background-image: url('../assets/images/chuan-pu/message_bg.png');
  background-size: 100% 100%;
  border-radius: 15px;
  transform: translate(-50%, -50%);
}

.is-sub-box {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  min-height: 290px;
  overflow: hidden;
}

.title-box {
  width: 100%;
  height: 54px;
  margin-top: 30px;
  font-size: 20px;
  font-weight: bold;
  line-height: 54px;
  text-align: center;
}

.is-sub-box .sub-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 80%;
  height: auto;
  margin: 6px auto 30px;
  overflow: hidden;
  font-size: 12px;
  line-height: 1.5;
  color: #161616;
  text-align: center;
  word-break: break-all;
}

.is-sub-box .sub-text span {
  display: inline-block;
  width: 100%;
  height: auto;
  margin: auto 0;
  overflow: hidden;
}

.is-sub-box .confirm-box {
  width: 60%;
  margin: 0 auto;
}

.close-btn {
  position: absolute;
  bottom: -40px;
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
