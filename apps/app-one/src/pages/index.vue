<script setup>

</script>

<template>
  <div>
    <div text-center>
      <span text-sm font-medium>Vue 生态技术Demo</span>
    </div>
    <div m-1 flex flex-wrap>
      <RouterLink m-10px border-rd bg-black px-2 py-1 text-white hover:bg-dark to="/graphQL">
        GraphQL
      </RouterLink>
      <RouterLink m-10px border-rd bg-black px-2 py-1 text-white hover:bg-dark to="/dynamic-load-assets-image">
        动态加载图片
      </RouterLink>
      <RouterLink m-10px border-rd bg-black px-2 py-1 text-white hover:bg-dark to="/function-component">
        函数式组件
      </RouterLink>
      <RouterLink m-10px border-rd bg-black px-2 py-1 text-white hover:bg-dark to="/rxjs">
        RxJs
      </RouterLink>
      <RouterLink m-10px border-rd bg-black px-2 py-1 text-white hover:bg-dark to="/tan-stack-query">
        TanStack Query
      </RouterLink>
      <RouterLink m-10px border-rd bg-black px-2 py-1 text-white hover:bg-dark to="/markdown">
        Markdown Preview
      </RouterLink>
    </div>
  </div>
</template>
