import Axios, {
  Method,
  AxiosError,
  AxiosResponse,
  AxiosRequestConfig,
} from 'axios';

export type RequestMethods = Extract<
  Method,
  'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>;

export interface HttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface HttpResponse extends AxiosResponse {
  config: HttpRequestConfig;
}

export interface IPaging<T> {
  list: T[];
  current: number;
  size: number;
  total: number;
}
export interface VResponse<T> {
  data: T;
  msg?: string;
  code?: number;
}

export type VPagination<T> = Partial<T> & { size: number; current: number };

export interface HttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: HttpRequestConfig) => void;
  beforeResponseCallback?: (response: HttpResponse) => void;
}

export default class Http {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: HttpRequestConfig,
  ): Promise<T>;
  post<T, P>(url: string, params?: T, config?: HttpRequestConfig): Promise<P>;
  get<T, P>(url: string, params?: T, config?: HttpRequestConfig): Promise<P>;
}
