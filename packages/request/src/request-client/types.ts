// 后续根据实际情况修改
// 原始请求数据类型
export type RequestBody = Record<string, unknown> | string | number;

export interface EncryptResponseBody<T = string> {
  // 加密后的数据
  data: T
  // AES KEY 用 RSA 公钥加密
  e: string
  // AES IV 用 RSA 公钥加密
  k: string
  // 签名
  s: string
  // 时间戳
  timestamp: number
}

export type EncryptRequestConfig = EncryptResponseBody;

export interface HttpResponse<T = unknown> {
  data: EncryptResponseBody<T>
  code: number
  msg: string
}

export type ExceptionResponse = Omit<HttpResponse, "data">;

export type ResponseData<T> = T extends HttpResponse<infer U> ? U : never;
