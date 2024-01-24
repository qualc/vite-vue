import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import {
  HttpError,
  HttpRequestConfig,
  HttpResponse,
  RequestMethods,
  VResponse,
} from './types';
import { ElMessage } from 'element-plus';
import router from '@/router';
import { useUserStore } from '@/store/modules/user';

// 相关配置请参考：http://www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  baseURL: 'http://localhost:3000',
  // 请求超时时间
  timeout: 10000,
  headers: {
    Accept: 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
};
class Http {
  /** 保存当前Axios实例对象 */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig);

  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  /** 请求拦截 */
  private httpInterceptorsRequest(): void {
    Http.axiosInstance.interceptors.request.use(
      async (config: HttpRequestConfig): Promise<any> => {
        const token = localStorage.getItem('token');

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return Promise.resolve(config);
      },
      (error) => {
        return Promise.reject(error);
      },
    );
  }

  /** 响应拦截 */
  private httpInterceptorsResponse(): void {
    const instance = Http.axiosInstance;
    instance.interceptors.response.use(
      (response: HttpResponse) => {
        if (response.status === 200) {
          return response.data;
        } else {
          return Promise.reject(response.data);
        }
      },
      (error: HttpError) => {
        const $error = error;
        // 所有的响应异常 区分来源为取消请求/非取消请求
        $error.isCancelRequest = Axios.isCancel($error);
        return Promise.reject($error);
      },
    );
  }

  /** 通用请求工具函数 */
  public request<T, P = any>(
    method: RequestMethods,
    url: string,
    data?: T,
    axiosConfig?: HttpRequestConfig,
  ): Promise<P> {
    const config = {
      method,
      url,
      ...data,
      ...axiosConfig,
    } as HttpRequestConfig;

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      Http.axiosInstance
        .request(config)
        .then((response: VResponse<P>) => {
          if (response.code === 200) {
            resolve(response.data);
          } else if (response.code === 401) {
            useUserStore().clearAll();
            router.push('/login');
          } else {
            reject(response);
            ElMessage.error(response.msg || '请求失败');
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /** 单独抽离的post工具函数 */
  public post<T = any, P = VResponse<any>>(
    url: string,
    data?: T,
    config?: HttpRequestConfig,
  ): Promise<P> {
    return this.request<AxiosRequestConfig<T>, P>(
      'post',
      url,
      { data },
      config,
    );
  }
  /** 单独抽离的put工具函数 */
  public put<T = any, P = VResponse<any>>(
    url: string,
    data?: T,
    config?: HttpRequestConfig,
  ): Promise<P> {
    return this.request<AxiosRequestConfig<T>, P>('put', url, { data }, config);
  }

  /** 单独抽离的get工具函数 */
  public get<T = any, P = undefined>(
    url: string,
    params?: P extends undefined ? any : T,
    config?: HttpRequestConfig,
  ): Promise<P extends undefined ? T : P> {
    return this.request<AxiosRequestConfig, P extends undefined ? T : P>(
      'get',
      url,
      { params },
      config,
    );
  }
  public delete<P = VResponse<any>>(
    url: string,
    config?: HttpRequestConfig,
  ): Promise<P> {
    return this.request<AxiosRequestConfig, P>('delete', url, config);
  }
}

export const http = new Http();
