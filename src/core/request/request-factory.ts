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
  data?: T;
  status: string;
  message?: string;
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
  onError: (res: IResponse<any>) => void;
}

export default class RequestFactory {
  private options: IRequestFactoryOptions;

  constructor(options: IRequestFactoryOptions) {
    this.options = options;
  }

  protected onError(res: IResponse<any>): Promise<any> {
    if (this.options.onError) {
      this.options.onError(res);
    }

    return Promise.reject<any>(res);
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
    let requestBody: BodyInit | null = null;
    const headers: Record<string, any> = {
      'X-Requested-With': 'XMLHttpRequest'
    };

    if (body) {
      if (!isFormData) {
        headers['Content-Type'] = 'application/json;charset=utf-8';
        requestBody = JSON.stringify(body);
      } else {
        // @ts-ignore
        requestBody = body;
      }
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

    return fetch(request).then((response: Response): Promise<T> => {
      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
        return response.json().then((res: IResponse<T>) => {
          if (res.status === "OK") {
            return res.data;
          }

          return this.onError(res);
        });
      }

      // @ts-ignore
      return response;
    })
      .catch((err) => {
        return this.onError(err);
      });
  }
}
