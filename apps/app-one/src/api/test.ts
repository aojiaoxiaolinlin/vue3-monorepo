import type { HttpResponse } from "@lin/request";
import { aesDecrypt, createEncryptRequest } from "@lin/request";
import { API_BASE_URL } from "../configs";

const encryptRequest = createEncryptRequest({
  baseURL: `${API_BASE_URL}/yipay_activity/api`,
});
encryptRequest.addResponseInterceptor<HttpResponse<string>>({
  fulfilled: (response) => {
    if (response.data.code === 200) {
      const decryptData = aesDecrypt(response.data.data);
      try {
        // 尝试解析为 JSON，如果解析失败，直接返回字符串，让调用方自行处理
        return JSON.parse(decryptData);
      }
      catch {
        return decryptData;
      }
    }
    return Promise.reject(response.data);
  },
  rejected: (error) => {
    console.log("response intercept error", error);
    return Promise.reject(error);
  },
});
