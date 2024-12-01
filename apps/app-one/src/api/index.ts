import request from "@lin/request";

enum ApiURL {
  PUBLIC_KEY = "/publicKey",
}

// 浏览器原生的加密 crypto 需要安全上下文（localhost / HTTPS)，是否使用有待评估，保险起见，还是第三方库吧
// 参考：https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API
export function getPublicKey() {
  request
    .get(ApiURL.PUBLIC_KEY)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.error(err);
    });
}
