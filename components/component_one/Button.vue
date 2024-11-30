<template>
  <div>
    <button @click="increment">Click me{{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0)
// 增加一个自增函数
function increment() {
  count.value++
}
</script>

<style scoped>
button {
  display: inline-block;
  padding: 15px 32px;
  margin: 4px 2px;
  font-size: 16px;
  color: white;
  text-align: center;
  text-decoration: none;
  cursor: pointer;
  background-color: #4CAF50;
  border: none;
}

button:hover {
  background-color: #45a049;
}

button:active {
  background-color: #45a049;
  box-shadow: 0 5px #666;
  transform: translateY(4px);
}

button:focus {
  outline: none;
}

button:disabled {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}

button:disabled:hover {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}

button:disabled:active {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}

button:disabled:focus {
  outline: none;
}

button:disabled:disabled {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}

button:disabled:disabled:hover {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}

button:disabled:disabled:active {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}

button:disabled:disabled:focus {
  outline: none;
}

button:disabled:disabled:disabled {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}

button:disabled:disabled:disabled:hover {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}

button:disabled:disabled:disabled:active {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}

button:disabled:disabled:disabled:focus {
  outline: none;
}

button:disabled:disabled:disabled:disabled {
  color: #666;
  cursor: not-allowed;
  background-color: #ccc;
}
</style>
