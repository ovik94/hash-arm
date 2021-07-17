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

export type IRequestConfigList = Record<string, IRequestConfig>;

export type GetParams = Record<string, string | number | boolean | null | undefined>;

export type PostParams = Record<string, any>;

export interface RequestOptions {
  timeout?: number;
  transport?: (...args: any[]) => Promise<any>;
  [option: string]: any;
}

export default class RequestFactory {
  readonly requestConfigList: IRequestConfigList;

  constructor() {
    this.requestConfigList = {
      getTest: {
        method: RequestMethods.GET,
        path: '/api/test'
      }
    };
  }

  protected onSuccess<T>(response: Response): Promise<T> {
    return response.text().then(text => (text ? JSON.parse(text) : {}));
  }

  protected onError(response: Response): Promise<any> {
    return Promise.reject<any>(response.statusText);
  }

  public createRequest<T>(requestId: string, params?: GetParams, body?: PostParams, options?: RequestOptions): Promise<never | T> {
    const isFormData = typeof FormData === 'function' && (body instanceof FormData || body instanceof File);
    const { path, method } = this.requestConfigList[requestId];
    let requestBody: string | null | undefined;
    const headers: Record<string, any> = {
      'X-Requested-With': 'XMLHttpRequst'
    };
    const url = `host/${path}`;

    if (!isFormData) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
      requestBody = JSON.stringify(body);
    }

    const request = new Request(url, {
      cache: 'no-cache',
      credentials: 'same-origin',
      method,
      headers,
      ...options,
      body: requestBody
    });

    return fetch(request).then((response: Response): Promise<T> => {
      if (response.ok) {
        return this.onSuccess<T>(response);
      }
      return this.onError(response);
    });
  }
}
