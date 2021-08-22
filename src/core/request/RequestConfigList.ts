import { IRequestConfigList, RequestMethods } from './request-factory';

const RequestConfigList: IRequestConfigList = {
  getUsersList: {
    method: RequestMethods.GET,
    path: '/api/user/list'
  },
  getCheckList: {
    method: RequestMethods.GET,
    path: '/api/checkList'
  },
  getContractors: {
    method: RequestMethods.GET,
    path: '/api/contractors'
  },
  getPackagingList: {
    method: RequestMethods.GET,
    path: '/api/contractors/packaging'
  },
  getContractorInfo: {
    method: RequestMethods.GET,
    path: '/api/contractors/info'
  },
  postCreateOrder: {
    method: RequestMethods.POST,
    path: '/api/contractors/create'
  }
};

export default RequestConfigList;
