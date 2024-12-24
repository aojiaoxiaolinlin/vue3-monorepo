import { defineStore } from "pinia";
import { type UserPhoneInfo, getGameCountApi } from "#/api";


export const useGameStore = defineStore('game', {
  state: () => ({
    gameCount: 0,
  }),
  actions: {
    initGameCount(userPhoneInfo: UserPhoneInfo) {
      getGameCountApi(userPhoneInfo).then((res) => {
        this.gameCount = JSON.parse(res.data.data.data);
        console.log(this.gameCount);
      }).catch((err) => {
        console.log('处理错误', err);
      });
    }
  }
})
