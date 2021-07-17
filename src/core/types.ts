import React from 'react';
import RequestFactory from './request/request-factory';

export interface IMainAppOptions {
  createRequest: RequestFactory['createRequest'];
  locale: Record<string, any>
}

export interface IRouteProps {
  children: React.ReactNode;
  [option: string]: any;
}
