import request from "@lin/request";
import { generateRSAKeyPair } from "#/utils/RsaUtil";

enum ApiURL {
  PUBLIC_KEY = "/publicKey",
}

let backendKey: string;

// 用于从后端获取RSA公钥
export function getPublicKey() {
  request
    .get(ApiURL.PUBLIC_KEY)
    .then((res) => {
      backendKey = res.data;
      console.log(res);
      // 生成RSA密钥对
      const { publicKey, privateKey } = generateRSAKeyPair();
      console.log(publicKey);
      console.log(privateKey);
    })
    .catch((err) => {
      console.error(err);
    });
}

