<script setup>

</script>

<template>
  <div>
    <div text-center>
      <span text-sm font-medium>Vue 生态技术Demo</span>
    </div>
    <div m-1 flex flex-wrap>
      <RouterLink to="/graphQL">
        GraphQL
      </RouterLink>
      <RouterLink to="/dynamic-load-assets-image">
        动态加载图片
      </RouterLink>
      <RouterLink to="/function-component">
        函数式组件
      </RouterLink>
      <RouterLink to="/rxjs">
        RxJs
      </RouterLink>
      <RouterLink to="/tan-stack-query">
        TanStack Query
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
a {
  @apply  px-2 py-1 m-10px bg-black text-white border-rd hover:bg-dark
}
</style>
