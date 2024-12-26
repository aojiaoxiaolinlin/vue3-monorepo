<template>
  <div class="box" v-if="mode">
    <div class="content">
      <div class="is-sub-box">
        <div class="title-box">{{ props.title }}</div>
        <div class="sub-text" :style="`text-align: ${props.textAlign};`" v-html="props.content"></div>
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
}>(), {
  title: '提示',
  content: 'center',
});

const emit = defineEmits<{
  close: []
}>();


const onClose = () => {
  mode.value = false;
  emit('close');
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
  width: 261px;
  height: auto;
  background: linear-gradient(90deg, #f8e2bb, #fdf7ec);
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

.is-sub-box {
  width: 100%;
  height: auto;
  overflow: hidden;
}

.is-sub-box .sub-text {
  width: 85%;
  height: auto;
  margin: 6px auto 17.5px;
  overflow: hidden;
  font-size: 12px;
  font-weight: 700;
  line-height: 1.5;
  color: #161616;
  text-align: center;
}
</style>
