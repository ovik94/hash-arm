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
      getUsersList: {
        method: RequestMethods.GET,
        path: '/api/user/list'
      },
      getCheckList: {
        method: RequestMethods.GET,
        path: '/api/checkList'
      },
      getPackagingList: {
        method: RequestMethods.GET,
        path: '/api/contractors/packaging'
      }
    };
  }

  static onSuccess<T>(response: Response): Promise<IResponse<T>> {
    return response.text().then(text => (text ? JSON.parse(text) : {}));
  }

  static onError(response: Response): Promise<any> {
    return Promise.reject<any>(response.statusText);
  }

  public createRequest<T>(
    requestId: string,
    params?: GetParams,
    body?: PostParams,
    options?: RequestOptions
  ): Promise<never | IResponse<T>> {
    const isFormData = typeof FormData === 'function' && (body instanceof FormData || body instanceof File);
    const { path, method } = this.requestConfigList[requestId];
    let requestBody: string | null | undefined;
    const headers: Record<string, any> = {
      'X-Requested-With': 'XMLHttpRequst'
    };

    if (!isFormData) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
      requestBody = JSON.stringify(body);
    }

    const request = new Request(path, {
      cache: 'no-cache',
      credentials: 'same-origin',
      method,
      headers,
      ...options,
      body: requestBody
    });

    return fetch(request).then((response: Response): Promise<IResponse<T>> => {
      if (response.ok) {
        return RequestFactory.onSuccess<T>(response);
      }
      return RequestFactory.onError(response);
    });
  }
}
