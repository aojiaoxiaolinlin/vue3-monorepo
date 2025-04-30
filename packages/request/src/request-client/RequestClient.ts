import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from "axios";
import { bindMethods } from "@lin/utils";
import axios from "axios";
import defu from "defu";
import { InterceptorManager } from "./modules/interceptor";
import { aesEncrypt } from "./RsaUtil";

export class RequestClient {
  private readonly instance: AxiosInstance;

  public addRequestInterceptor: InterceptorManager["addRequestInterceptor"];
  public addResponseInterceptor: InterceptorManager["addResponseInterceptor"];

  constructor(options: CreateAxiosDefaults) {
    const defaultConfig: CreateAxiosDefaults = {
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      // 默认超时时间
      timeout: 10_000,
    };
    const { ...axiosConfig } = options;
    const requestConfig = defu(defaultConfig, axiosConfig);
    this.instance = axios.create(requestConfig);

    bindMethods(this);

    // 实例化拦截器管理器
    const interceptorManager = new InterceptorManager(this.instance);
    this.addRequestInterceptor = interceptorManager.addRequestInterceptor.bind(interceptorManager);
    this.addResponseInterceptor = interceptorManager.addResponseInterceptor.bind(interceptorManager);
  }

  public async request<T>(url: string, config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance({
        url,
        ...config,
      });
      return response as T;
    }
    catch (error: unknown) {
      const err = error as AxiosError;
      throw err.response ? err.response.data : err;
    }
  }

  public post<O = unknown, I = unknown, T = O>(url: string, data?: I, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { method: "POST", data, ...config });
  }

  public postAndParams<O = unknown, I = unknown, T = O>(
    url: string,
    data?: I,
    params?: Record<string, string | number>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    return this.request<T>(url, { method: "POST", data, params, ...config });
  }

  public get<O, T = O>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { method: "GET", ...config });
  }

  public getAndParams<O, T = O>(
    url: string,
    params: Record<string, string | number>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    const urlWithParams = `${url}?${Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join("&")}`;
    return this.request<T>(urlWithParams, { method: "GET", ...config });
  }

  public getAndPaths<O, T = O>(
    url: string,
    paths: Record<string, string | number>,
    config?: AxiosRequestConfig,
  ): Promise<T> {
    let urlWithPaths = url;
    for (const key of Object.keys(paths)) {
      urlWithPaths = urlWithPaths.replace(`{${key}}`, paths[key] as string);
    }
    return this.request<T>(urlWithPaths, { method: "GET", ...config });
  }

  public delete<O>(url: string): Promise<O> {
    return this.request<O>(url, { method: "DELETE" });
  }
}

/**
 * 创建加密请求, 默认配置加密请求拦截器,
 * 规定所有API请求数据加密一律使用{ data: json string, timestamp: number }的格式
 */
export function createEncryptRequest(options: CreateAxiosDefaults) {
  const request = new RequestClient(options);

  request.addRequestInterceptor({
    fulfilled: (config) => {
      if (config.data) {
        const encryptRequestConfig = aesEncrypt(config.data);
        const { data, timestamp, k, e, s } = encryptRequestConfig;
        config.data = {
          data,
          timestamp,
        };
        Object.assign(config.headers, { i: k, e, s });
      }
      return config;
    },
  });
  return request;
}
