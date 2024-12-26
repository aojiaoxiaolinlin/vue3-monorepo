import { type EncryptResponse, aesDecrypt, createEncryptRequest } from "@lin/request";
import { AxiosError } from "axios";
import { ShowMessageTip } from "#/composables/message-tip";
import { API_BASE_URL } from "../../configs";

const encryptRequest = createEncryptRequest({
  baseURL: API_BASE_URL,
  withCredentials: true,
})
encryptRequest.addResponseInterceptor<EncryptResponse>({
  fulfilled: (response) => {
    if (response.data.code === 200) {
      const decryptData = aesDecrypt(response.data.data);
      try {
        // 尝试解析为 JSON，如果解析失败，直接返回字符串，让调用方自行处理
        response.data.data.data = JSON.parse(decryptData);
      } catch (error) {
        response.data.data.data = decryptData;
      }
      // response.data.data.data = aesDecrypt(response.data.data);
      return response;
    }
    return Promise.reject(response.data);
  },
  rejected: (error) => {
    console.log('response intercept error', error);
    console.log(error.response);
    if (error instanceof AxiosError) {
      console.log('AxiosError', error.code);
      // 服务器错误，目前后端异常返回 500
      if (error.status === 500) {
        const data = error.response?.data;
        // 只不是为了获取错误信息，ts 会报错，所以需要断言
        let errorMsg: undefined | string;
        if (data) {
          const errorRes = data as { code: number, msg: string };
          errorMsg = errorRes.msg;
        }
        ShowMessageTip({
          title: '服务器错误',
          content: errorMsg ?? '请稍后再试',
        })
      }
    }
    return Promise.reject(error);
  }
})

export { encryptRequest };
