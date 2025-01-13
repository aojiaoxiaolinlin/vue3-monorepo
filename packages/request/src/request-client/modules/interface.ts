import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { ExceptionResponse, HttpResponse, ResponseData } from "../types";

interface RequestInterceptorConfig {
  fulfilled?: (
    config: InternalAxiosRequestConfig,
  ) =>
    | InternalAxiosRequestConfig<unknown>
    | Promise<InternalAxiosRequestConfig<unknown>>;
  rejected?: (error: unknown) => unknown;
}


interface ResponseInterceptorConfig<T extends HttpResponse> {
  fulfilled?: (
    response: AxiosResponse<T>,
  ) => T | ResponseData<T>;
  rejected?: (error: AxiosError<ExceptionResponse>) => unknown;
}

export type { RequestInterceptorConfig, ResponseInterceptorConfig };
