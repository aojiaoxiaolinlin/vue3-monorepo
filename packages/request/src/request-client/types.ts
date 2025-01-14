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

export type EncryptResponseBody<T = string | unknown> = {
  data: T;
  e: string;
  k: string;
  s: string;
  timestamp: number;
};

/**
 * @deprecated 请使用 HttpResponse 替代, 后续会废弃
 */
export type EncryptResponse<T = string> = {
  data: EncryptResponseBody<T>;
  code: number;
  msg: string;
};

// 换个名子罢了。更加具有通用性
export type HttpResponse<T = unknown> = {
  data: EncryptResponseBody<T>;
  code: number;
  msg: string;
};

export type ExceptionResponse = {
  code: number;
  msg: string;
};

export type ResponseData<T> = T extends HttpResponse<infer U> ? U : never;
