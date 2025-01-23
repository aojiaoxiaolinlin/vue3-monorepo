<template>
  <div
    v-if="isShow"
    class="modal"
  >
    <div class="modal-content">
      <h1>My Modal</h1>
      <p>My Modal is: {{ message }}</p>
      <button @click="onClose">关闭</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{ message: string }>()
const mode = defineModel('isShow', { type: Boolean, default: false })
const emit = defineEmits<{ onClose: [], }>()
const onClose = () => {
  mode.value = false
  emit('onClose')
}
</script>

<style scoped>
/* 这是一个弹出框 */
h1 {
  color: red;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(0 0 0 / 50%);
}

.modal-content {
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgb(0 0 0 / 10%);
}
</style>
