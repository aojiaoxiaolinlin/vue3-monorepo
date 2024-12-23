<script setup lang="ts">
import { wxLoginGetUserInfo } from '@lin/utils';
import { getGameCountApi } from '#/api';

getGameCountApi()
const userInfo = wxLoginGetUserInfo("KXLZAQPCsU7zhpLXVgUFstfqEXR6BS%2BaYUT7Mks0EJAG71njSF%2BQH7HJFi8P/r4K9%2B1HWfrGICm5ryCEoyv7NLjQiUW%2BkdTXOseXLgq5m7eAdquxBN6tIzF1X4mYBTt6JGlamiESsFG6%2BM/JKLXvRkpcRpByYevZaBBy3ffH0RHIAfOmHNMHA5MXwPHx0ioDa2G7ABtKHmkYZJz4XLrkpeYTazTCZhOS/RmeqO1BkrUEWWW%2BSK5sl2gu3GvP/HPHK8Dhcvf/xrVr0ePn7rHB7YmRnrMuzWzewOB6hs4l09/v77hFInW1sSyrhG3A0RlKq%2BmI1VwGl2rw7nJyynA10rBiyQWP0HM2/uRP5IiyOQY=")
console.log(userInfo)
</script>

<template>
  <div>
    <h1>四川方言</h1>
  </div>
</template>
