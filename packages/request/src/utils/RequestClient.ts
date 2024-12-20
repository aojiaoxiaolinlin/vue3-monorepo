import axios from 'axios';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';
import defu from 'defu';

export class RequestClient {
  private readonly instance: AxiosInstance;
  constructor(options: CreateAxiosDefaults) {

    const defaultConfig: CreateAxiosDefaults = {
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      // 默认超时时间
      timeout: 10_000,
    };
    const { ...axiosConfig } = options;
    const requestConfig = defu(defaultConfig, axiosConfig);
    this.instance = axios.create(requestConfig);
  }

  public async request<T>(url: string, config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance({
        url,
        ...config,
      })
      return response as T;
    } catch (error: unknown) {
      const err = error as AxiosError;
      throw err.response ? err.response.data : err;
    }
  }

  public post<O = unknown, I = unknown, T = AxiosResponse<O>>(url: string, data?: I, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { method: 'POST', data, ...config });
  }

  public postAndParams<O = unknown, I = unknown, T = AxiosResponse<O>>(url: string, data?: I, params?: Record<string, string | number>, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { method: 'POST', data, params, ...config });
  }

  public get<O, T = AxiosResponse<O>>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.request<T>(url, { method: 'GET', ...config });
  }

  public getAndParams<O, T = AxiosResponse<O>>(url: string, params: Record<string, string | number>, config?: AxiosRequestConfig): Promise<T> {
    const urlWithParams = `${url}?${Object.keys(params).map(key => `${key}=${params[key]}`).join('&')}`;
    return this.request<T>(urlWithParams, { method: 'GET', ...config });
  }

  public getAndPaths<O, T = AxiosResponse<O>>(url: string, paths: Record<string, string | number>, config?: AxiosRequestConfig): Promise<T> {
    let urlWithPaths = url;
    for (const key of Object.keys(paths)) {
      urlWithPaths = urlWithPaths.replace(`{${key}}`, paths[key] as string);
    }
    return this.request<T>(urlWithPaths, { method: 'GET', ...config });
  }
}
