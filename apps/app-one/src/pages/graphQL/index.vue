<script setup lang="ts">
import { useUserQuery } from "#/graphql";
import DemoPage from "#/layouts/demo-page.vue";

useHead({
  title: "GraphQL Demo",
});
const variable = reactive({ id: "1" });
const { result, loading } = useUserQuery(variable);
</script>

<template>
  <DemoPage>
    <button @click="variable.id += '2'">
      update request params {{ variable.id }}
    </button>
    <div>
      <div>
        loading: {{ loading }}
      </div>
      <p>可以观察到，当参数发生变化，graphQL会自动发出请求，并且有防抖机制</p>
      <div>{{ result }}</div>
    </div>
  </DemoPage>
</template>
