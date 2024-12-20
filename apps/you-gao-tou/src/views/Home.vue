<template>
  <div>
    <div class="home">
      <div class="scroll-box">
        <div class="rule-text">规则</div>
        <div class="content">
          <div class="z-pan-box">
            <div class="z-pan">
              <img ref="zPan" src="../assets/z-pan.png" alt="" srcset="" />
            </div>
            <div class="z-pan-ding">
              <img src="../assets/z-pan-ding.png" alt="" srcset="" />
            </div>
          </div>

          <div class="btn-all">
            <div class="btn-two">
              <div class="game-count">
                <span>次</span>
              </div>
              <img src="../assets/btn2.png" alt="" srcset="" />
            </div>
          </div>
          <!-- <List v-for="item in listData" :pageData="item"></List> -->
          <div class="bottom-bg">
            <img src="../assets/button_bg.png" alt="" />
            <span></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
img {
  width: 100%;
  height: auto;
}

.home {
  width: 100%;
  height: 100vh;
  overflow: hidden scroll;
  background-color: #f00000;
}

.scroll-box {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
  background: url('../assets/bg.png') top center no-repeat;
  background-size: 100% auto;
}

.content {
  width: 100%;
  height: auto;
  padding-top: 6.25rem;
}

.z-pan-box {
  position: relative;
  margin: 0 auto;
}

.z-pan-box .z-pan {
  display: flex;
  width: 100%;
  height: 100%;
}

.btn-all {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 2.6rem;
}

.btn-all .btn-one {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 80px;
}

.bottom-bg img {
  width: 100%;
  height: auto;
}

.copy-right img {
  width: 100%;
  height: auto;
}

.btn-all .btn-one img {
  width: 171px;
  height: 143px;
}

.btn-all .btn-two {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 342px;
  height: 80px;
  margin: 0 24px;
}

.btn-all .btn-two img {
  width: 5.5rem;
  height: 2rem;
}

.btn-all .btn-two .game-count {
  position: absolute;
  top: -53px;
  right: -33px;
  z-index: 10;
  width: 121px;
  height: 82px;

  /* background: url('../assets/game-time-bg.png') center center no-repeat; */
  background-size: 100% 100%;
}

.copy-right {
  display: flex;
  width: 389px;
  height: auto;
  margin: 24px auto 64px;
  overflow: hidden;
}

.z-pan-box .z-pan-ding img {
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 160px;
  height: 186px;
  transform: translateX(-50%) translateY(50%);
}

.bottom-bg {
  position: relative;
  width: 100%;
  height: auto;
  overflow: hidden;
}

.bottom-bg span {
  position: absolute;
  bottom: 90px;
  left: 50%;
  display: block;
  width: 60%;
  height: 80px;
  transform: translateX(-50%);
}

.btn-all .btn-two .game-count span {
  display: block;
  width: 98px;
  height: 48px;
  margin: 11px auto 0;
  font-size: 28px;
  font-weight: 700;
  line-height: 48px;
  color: #e7342f;
  text-align: center;
  white-space: nowrap;
}

.rule-text {
  position: absolute;
  top: 280px;
  right: 0;
  width: 80px;
  height: 40px;
  font-size: 0.64rem;
  line-height: 40px;
  color: #fff;
  text-align: center;
  background-color: rgb(0 0 0 / 30%);
  border-radius: 10px;
}
</style>
