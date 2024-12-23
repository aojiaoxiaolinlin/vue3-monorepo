import { type EncryptResponse, aesDecrypt, createEncryptRequest } from "@lin/request";
import { API_BASE_URL } from "../../configs";

const encryptRequest = createEncryptRequest({
  baseURL: API_BASE_URL,
  withCredentials: true,
})
encryptRequest.addResponseInterceptor<EncryptResponse>({
  fulfilled: (response) => {
    if (response.data.code === 200) {
      response.data.data.data = aesDecrypt(response.data.data);
      return response;
    }
    return Promise.reject(response.data);
  },
  rejected: (error) => {
    console.log('response intercept error', error);
    console.log(error.response);
    return Promise.reject(error);
  }
})

export { encryptRequest };
