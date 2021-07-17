import React from 'react';
import { IAdmin } from 'src/store/rootStore';
import RequestFactory from './request/request-factory';

export interface IMainAppOptions {
  createRequest: RequestFactory['createRequest'];
  locale: Record<string, any>
}

export interface IStoreContext {
  admin: IAdmin;
  setAdmin: (data: IAdmin) => void;
}

export interface IRouteProps {
  children: React.ReactNode;
  [option: string]: any;
}
