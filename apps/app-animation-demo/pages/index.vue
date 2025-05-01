<script setup lang="ts">
const swiperHorizontalRef = useTemplateRef("swiperHorizontalRef");
const swiperVerticalRef = useTemplateRef("swiperVerticalRef");

const horizontalSwiper = useSwiper(swiperHorizontalRef as Ref, {
  autoplay: {
    delay: 1000,
    disableOnInteraction: false,
  },
  direction: "horizontal",
});

useSwiper(swiperVerticalRef as Ref, {
  effect: "creative",
  creativeEffect: {
    prev: {
      translate: [0, 0, 0],
      opacity: 0,
    },
    next: {
      translate: [0, 0, 0],
      opacity: 0,
    },
  },
  direction: "vertical",
});
</script>

<template>
  <main>
    <ClientOnly>
      <swiper-container
        ref="swiperVerticalRef"
        h-screen
        overflow-hidden
        :mousewheel="true"
        :simulate-touch="false"
        :init="false"
      >
        <swiper-slide style="background-color: #FA9; ">
          第一页
        </swiper-slide>
        <swiper-slide>
          <div style="width: 100%;">
            <swiper-container ref="swiperHorizontalRef" :loop="true">
              <swiper-slide class="menpai-1">
                <div h-full w-full class="menpai-1-role" />
              </swiper-slide>
              <swiper-slide class="menpai-2">
                <div h-full w-full class="menpai-2-role" />
              </swiper-slide>
            </swiper-container>
            <div
              absolute bottom-4 z-2 h-10 w-2xl flex justify-between
              class="menpai-nav left-50% -ml-84"
            >
              <a @click="horizontalSwiper.to(0)">
                <div>段氏</div>
              </a>
              <a @click="horizontalSwiper.to(1)">
                <div>段氏</div>
              </a>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide style="background-color: #C69; ">
          第三页
        </swiper-slide>
        <swiper-slide style="background-color: #A37; ">
          第四页
        </swiper-slide>
        <swiper-slide style="background-color: #9D9; ">
          第五页
        </swiper-slide>
      </swiper-container>
    </ClientOnly>
  </main>
</template>

<style scoped>
swiper-slide {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh !important;
  font-family: Roboto, sans-serif;
  font-size: 18px;
  font-size: 4rem;
  font-weight: bold;
}

.menpai-1 {
  background-image: url('../assets/images/bg-duanshi.jpg');
}

.menpai-2 {
  background-image: url('../assets/images/bg-wanlingshanzhuang.jpg');
}

.menpai-1-role {
  background: no-repeat 20% / cover;
  background-image: url('../assets/images/role-duanshi.png.webp');
}

.menpai-2-role {
  background: no-repeat 20% / cover;
  background-image: url('../assets/images/role-wanlingshanzhuang.png.png');
}

.menpai-nav {
  background-image: url('../assets/images/nav-bg.png.webp');
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: contain;
}
</style>
