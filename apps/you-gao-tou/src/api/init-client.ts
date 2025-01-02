import { type EncryptResponse, aesDecrypt, createEncryptRequest } from "@lin/request";
import { AxiosError } from "axios";
import { ShowMessageTip } from "#/composables/message-tip";
import { API_BASE_URL } from "../../configs";

const encryptRequest = createEncryptRequest({
  baseURL: API_BASE_URL,
  withCredentials: true,
})
// 可能需要更好的处理方式
encryptRequest.addResponseInterceptor<EncryptResponse<unknown>>({
  fulfilled: (response) => {
    if (response.data.code === 200) {
      if (response.data.msg === '无数据') {
        // 组织一个空数据返回
        const data: EncryptResponse<unknown> = { data: { data: [], e: '', k: '', s: '', timestamp: 0 }, code: 200, msg: '无数据' };
        response.data = data;
        return response;
      }
      if (response.data.data != null) {
        const decryptData = aesDecrypt(response.data.data);
        try {
          // 尝试解析为 JSON，如果解析失败，直接返回字符串，让调用方自行处理
          response.data.data.data = JSON.parse(decryptData);
        } catch (error) {
          response.data.data.data = decryptData;
        }
      }
      return response;
    }
    return Promise.reject(response.data);
  },
  rejected: (error) => {
    console.log('response intercept error', error);
    console.log(error.response);
    if (error instanceof AxiosError) {
      // 服务器错误，
      switch (error.status) {
        case 500:
        case 600: {
          const data = error.response?.data;
          // 只不是为了获取错误信息，ts 会报错，所以需要断言
          let errorMsg: undefined | string;
          if (data) {
            const errorRes = data as { code: number, msg: string };
            errorMsg = errorRes.msg;
          }
          switch (errorMsg) {
            case '该渠道优惠券已抢光!': {
              ShowMessageTip({
                title: '嗨！活动太火爆了！',
                content: '很抱歉，本场活动奖品已抢光，下一场幸运翻翻乐活动时间：2025年1月14日我们不见不散',
              });
              break;
            }
            default: {
              ShowMessageTip({
                title: '服务器错误',
                content: errorMsg ?? '请稍后再试',
              });
            }
          }
          break;
        }
        case 401: {
          ShowMessageTip({
            title: '未登录',
            content: '请登录后再试',
          });
          break;
        }
      }
    }
    return Promise.reject(error);
  }
})

export { encryptRequest };
