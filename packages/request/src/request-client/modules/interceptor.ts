import type { AxiosInstance, AxiosResponse } from "axios";
import type { HttpResponse, ResponseData } from "./../types";

import type { RequestInterceptorConfig, ResponseInterceptorConfig } from "./interface";

const defaultRequestInterceptorConfig: RequestInterceptorConfig = {
  fulfilled: (response) => response,
  rejected: (error) => Promise.reject(error),
};

class InterceptorManager {
  private axiosInstance: AxiosInstance;

  constructor(instance: AxiosInstance) {
    this.axiosInstance = instance;
  }

  addRequestInterceptor({ fulfilled, rejected }: RequestInterceptorConfig = defaultRequestInterceptorConfig) {
    this.axiosInstance.interceptors.request.use(fulfilled, rejected);
  }

  addResponseInterceptor<T extends HttpResponse>({ fulfilled, rejected }: ResponseInterceptorConfig<T>) {
    this.axiosInstance.interceptors.response.use(<O extends T>(response: AxiosResponse<O>): O | ResponseData<O> => {
      return fulfilled ? (fulfilled(response) as O | ResponseData<O>) : response.data || response;
    }, rejected);
  }
}

export { InterceptorManager };
