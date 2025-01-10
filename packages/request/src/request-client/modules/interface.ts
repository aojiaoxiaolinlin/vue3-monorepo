import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import type { ExceptionResponse } from "../types";

interface RequestInterceptorConfig {
  fulfilled?: (
    config: InternalAxiosRequestConfig,
  ) =>
    | InternalAxiosRequestConfig<unknown>
    | Promise<InternalAxiosRequestConfig<unknown>>;
  rejected?: (error: unknown) => unknown;
}


interface ResponseInterceptorConfig<T = unknown> {
  fulfilled?: (
    response: AxiosResponse<T>,
  ) => AxiosResponse | Promise<AxiosResponse>;
  rejected?: (error: AxiosError<ExceptionResponse>) => unknown;
}

export type { RequestInterceptorConfig, ResponseInterceptorConfig };
