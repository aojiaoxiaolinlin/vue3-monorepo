<script setup lang="ts">
import Button from "../Button.vue";

defineProps<{ message: string }>();
const emit = defineEmits<{
  click: []
  clickMe: [message: string]
}>();

function onDelayClose() {
  setTimeout(() => {
    emit("clickMe", "延迟2s关闭");
  }, 2000);
}
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <h1>My Message</h1>
      <p>My message is: {{ message }}</p>
      <button @click="onDelayClose">
        clickMe
      </button>
      <Button @click="emit('click')">
        关闭
      </Button>
    </div>
  </div>
</template>

<style scoped>
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
