<script setup lang="ts">
import { getData } from "#/api";
import DemoPage from "#/layouts/demo-page.vue";
import { useQuery } from "@tanstack/vue-query";

useHead({
  title: "TanStack Demo",
});

const name = "霖霖";
const age = ref(18);
const { isLoading, isFetching, isError, data, error } = useQuery({
  queryKey: ["data", { name, age }],
  queryFn: () => getData({ name, age: age.value }),
});
</script>

<template>
  <DemoPage>
  <h2>tanStack，参数变化同样会触发请求</h2>
    <button @click="age++">
      age:{{ age }}++
    </button>
    <p>{{ isLoading }}=={{ isFetching }}=={{ isError }}=={{ error }}</p>
    <p>{{ data }}</p>
  </DemoPage>
</template>
