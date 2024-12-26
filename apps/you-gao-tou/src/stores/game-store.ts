import { objectIsEmpty } from "@lin/utils";
import { defineStore } from "pinia";
import { type UserPhoneApiInfo, getGameCountApi } from "#/api";
import { ShowMessageTip } from "#/composables/message-tip";


export const useGameStore = defineStore('game', {
  state: () => ({
    gameCount: 0,
    userPhoneApiInfo: {} as UserPhoneApiInfo
  }),
  actions: {
    initOrUpdateGameCount(userPhoneApiInfo: UserPhoneApiInfo) {
      getGameCountApi(userPhoneApiInfo).then((res) => {
        this.gameCount = res.data.data.data;
        console.log(this.gameCount);
      }).catch((err) => {
        console.log('处理错误', err);
      });
    },
    initUserPhoneApiInfo(userPhoneApiInfo: UserPhoneApiInfo) {
      this.userPhoneApiInfo = userPhoneApiInfo;
      // 并且存入sessionStorage中
      sessionStorage.setItem('userPhoneApiInfo', JSON.stringify(userPhoneApiInfo));
    }
  },
  getters: {
    getUserPhoneApiInfo: (state) => {
      // 若无法从store中获取， 则从sessionStorage中获取
      if (objectIsEmpty(state.userPhoneApiInfo)) {
        const userPhoneApiInfo = sessionStorage.getItem('userPhoneApiInfo');
        if (userPhoneApiInfo) {
          return JSON.parse(userPhoneApiInfo) as UserPhoneApiInfo;
        }
        ShowMessageTip({
          title: '登录失效',
          content: '请退出后重新登录',
        })
        throw new Error('登录失效');
      }
      return state.userPhoneApiInfo;
    },
    isLogin() {
      return !objectIsEmpty(this.getUserPhoneApiInfo);
    }
  }
})
