import React from 'react';
import { IAdmin, IAdminList, ICheckList } from '../store/RootStore';
import RequestFactory from './request/request-factory';

export interface IMainAppOptions {
  createRequest: RequestFactory['createRequest'];
  locale: Record<string, any>
}

export interface IStoreContext {
  admin: IAdmin;
  adminList: IAdminList;
  checkList: ICheckList,
  setAdmin: (data: IAdmin) => void;
  setAdminList: (data: IAdminList) => void;
  setCheckList: (data: ICheckList) => void;
  fetchAdminList: () => void;
  isAuthorized: boolean;
  isLoading: boolean;
  setAuthorized: (value: boolean) => void;
  setLoading: (value: boolean) => void;
}

export interface IRouteProps {
  children: React.ReactNode;
  [option: string]: any;
}

export interface IContractor {
  id: string;
  manager: string;
  phone: string;
  title: string;
  description?: string;
  hasOrder?: boolean;
}
