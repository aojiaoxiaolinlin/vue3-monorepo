import { type EncryptResponse, type RequestBody, RequestClient, aesDecrypt, aesEncrypt } from "@lin/request";
import { API_BASE_URL } from "configs";

enum ApiURL {
  PUBLIC_KEY = "/publicKey",
  ENCRYPT_TEST = "/publicKey/encrypt",
  ENCRYPT_DATA_TEST = "/encryptDataTest",
}

let backendKey: string;

const request = new RequestClient({
  baseURL: API_BASE_URL,
});

/**
 * 获取后端公钥，用于动态RSA秘钥加密
 */
export function getPublicKey() {
  request
    .get<string>(ApiURL.PUBLIC_KEY)
    .then((res) => {
      backendKey = res.data;
      console.log(backendKey);
      // 生成RSA密钥对
      // const { publicKey, privateKey } = generateRSAKeyPair();
    })
    .catch((err) => {
      console.error(err);
    });
}

/**
 * 加密请求数据
 * @param {RequestBody} params 待加密的数据
 */
export function getTestData<T extends RequestBody>(params: T) {
  const encryptInfo = aesEncrypt(params);
  request.post<{ data: EncryptResponse, code: number }>(ApiURL.ENCRYPT_DATA_TEST, { data: encryptInfo.data, timestamp: encryptInfo.timestamp }, {
    headers: {
      'i': encryptInfo.k,
      'e': encryptInfo.e,
      's': encryptInfo.s,
    },
  }).then((res) => {
    console.log(res.data.data);
    const decryptData = aesDecrypt(res.data.data);
    console.log(decryptData);
  });
}

export function getEncryptData() {
  request.post<{ data: EncryptResponse }>(ApiURL.ENCRYPT_TEST).then(async (res) => {
    const decryptData = aesDecrypt(res.data.data);
    console.log(JSON.parse(decryptData));
  });
}


export function getData(params: Record<string, string | number>) {
  request.getAndParams<string>('/api/test', params).then((res) => {
    console.log(res.data);
  });
}

export function getDataWithPaths(paths: Record<string, string | number>) {
  request.getAndPaths<string>('/api/test/{id}', paths).then((res) => {
    console.log(res.data);
  });
}
