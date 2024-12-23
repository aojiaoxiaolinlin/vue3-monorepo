export type EncryptInfo = {
  // 加密后的数据
  data: string;
  // AES KEY 用 RSA 公钥加密
  e: string;
  // AES IV 用 RSA 公钥加密
  k: string;
  // 签名
  s: string;
  // 时间戳
  timestamp: number;
};


// 后续根据实际情况修改
// 原始请求数据类型
export type RequestBody = Record<string, unknown> | string | number;

export type EncryptResponseBody = {
  data: string;
  e: string;
  k: string;
  s: string;
  timestamp: number;
}

export type EncryptResponse = {
  data: EncryptResponseBody;
  code: number;
}
