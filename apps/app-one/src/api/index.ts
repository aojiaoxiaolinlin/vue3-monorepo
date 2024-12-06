import request, { aesDecrypt, aesEncrypt } from "@lin/request";

enum ApiURL {
  PUBLIC_KEY = "/publicKey",
  ENCRYPT_TEST = "/publicKey/encrypt",
  ENCRYPT_DATA_TEST = "/yipay_activity/api/encryptDataTest",
}

// let backendKey: string;

/**
 * 获取后端公钥，用于动态RSA秘钥加密
 */
export function getPublicKey() {
  request
    .get(ApiURL.PUBLIC_KEY)
    .then((res) => {
      // backendKey = res.data;
      console.log(res);
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
export function getTestData<T extends Record<string, unknown>>(params: T) {
  const encryptInfo = aesEncrypt(params);
  request.post(ApiURL.ENCRYPT_DATA_TEST, { data: encryptInfo.data, timestamp: encryptInfo.timestamp }, {
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
