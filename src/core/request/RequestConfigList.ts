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
  },
  getInstructions: {
    method: RequestMethods.GET,
    path: '/api/instructions'
  },
  getBarBalance: {
    method: RequestMethods.GET,
    path: '/api/iiko/bar-balance'
  },
  getMenu: {
    method: RequestMethods.GET,
    path: '/api/iiko/menu'
  },
  postBanquetSave: {
    method: RequestMethods.POST,
    path: '/api/banquets/save'
  },
  getFortuneList: {
    method: RequestMethods.GET,
    path: '/api/fortune/list'
  },
  reduceItemCount: {
    method: RequestMethods.POST,
    path: '/api/fortune/reduce'
  },
  processStatement: {
    method: RequestMethods.POST,
    path: '/api/statement/process'
  },
  getFeedbackList: {
    method: RequestMethods.GET,
    path: '/api/feedback/list'
  },
  sendFeedback: {
    method: RequestMethods.POST,
    path: '/api/feedback/send'
  }
};

export default RequestConfigList;
