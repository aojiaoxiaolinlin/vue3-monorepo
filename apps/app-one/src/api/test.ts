import { type EncryptResponse, RequestClient, aesDecrypt, aesEncrypt, createEncryptRequest } from "@lin/request";
import { API_BASE_URL } from "../../configs";

const request = new RequestClient({
  baseURL: `${API_BASE_URL}/yipay_activity/api`,
});

// export const getGameCountApi = () => {
//   const encryptInfo = aesEncrypt({ phone: '18989190946' })
//   return request.post<EncryptResponse>("/game/gameCount", {
//     data: encryptInfo.data,
//     timestamp: encryptInfo.timestamp
//   }, {
//     headers: {
//       'i': encryptInfo.k,
//       'e': encryptInfo.e,
//       's': encryptInfo.s,
//     },
//   }).then((res) => {
//     console.log(res.data.data);
//     const decryptData = aesDecrypt(res.data.data);
//     console.log(decryptData);
//   });
// }

const encryptRequest = createEncryptRequest({
  baseURL: `${API_BASE_URL}/yipay_activity/api`,
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
export const getGameCountApi = () => {
  const data = { phone: '18989190946' }
  // encryptRequest.post<EncryptResponse>("/game/gameCount", data).then((res) => {
  //   const decryptData = JSON.parse(res.data.body.data);
  //   console.log(decryptData);
  // });
  const params = { data: 'D2gE1ljWe%2FiCJdyiZJ%2FnpbCaqa9KxV%2BV0gYEdFp092tgAGU%2BrlM1PzEyMROBXB%2BfkR2lh7aolnvXyWXI4ezxA8iLA724LM6zmAvAVQjfoYfDJviwDBaQmDNwjvASni9bkaGC%2BgrshmYZ%2FIFXhYNGR9tjUpqB4qVF7urw3UYlGk%3D' };
  encryptRequest.postAndParams<EncryptResponse>("/game/gameCount", undefined, params).then((res) => {
    const decryptData = JSON.parse(res.data.data.data);
    console.log(decryptData);
  }).catch((err) => {
    console.log('处理错误', err);
  });
}
