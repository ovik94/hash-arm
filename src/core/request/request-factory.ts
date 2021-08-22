export enum RequestMethods {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT'
}

export interface IRequestConfig {
  method: keyof typeof RequestMethods;
  path: string;
  params?: any
}

export interface IResponse<T> {
  data: T;
  status: string;
}

export type IRequestConfigList = Record<string, IRequestConfig>;

export type GetParams = string | string[][] | Record<string, string> | URLSearchParams | undefined;

export type PostParams = Record<string, any>;

export interface RequestOptions {
  timeout?: number;
  transport?: (...args: any[]) => Promise<any>;

  [option: string]: any;
}

export interface IRequestFactoryOptions {
  requestConfigList: IRequestConfigList;
  onError: (status: string) => void;
}

export default class RequestFactory {
  private options: IRequestFactoryOptions;

  constructor(options: IRequestFactoryOptions) {
    this.options = options;
  }

  protected onError(status: string): Promise<any> {
    if (this.options.onError) {
      this.options.onError(status);
    }

    return Promise.reject<any>(status);
  }

  public createRequest<T>(
    requestId: string,
    params?: GetParams,
    body?: PostParams,
    options?: RequestOptions
  ): Promise<never | T> {
    const isFormData = typeof FormData === 'function' && (body instanceof FormData || body instanceof File);
    let { path } = this.options.requestConfigList[requestId];
    const { method } = this.options.requestConfigList[requestId];
    let requestBody: string | null | undefined;
    const headers: Record<string, any> = {
      'X-Requested-With': 'XMLHttpRequest'
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
      requestBody = JSON.stringify(body);
    }

    if (params) {
      path += `?${new URLSearchParams(params).toString()}`;
    }

    const request = new Request(path, {
      cache: 'no-cache',
      credentials: 'same-origin',
      method,
      headers,
      ...options,
      body: requestBody
    });

    return fetch(request).then((response: Response): Promise<T> => response.json()
      .then((res: IResponse<T>) => {
        if (res.status === 'OK') {
          return res.data;
        }

        return this.onError(res.status);
      }));
  }
}
