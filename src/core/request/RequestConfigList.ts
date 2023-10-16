import { IRequestConfigList, RequestMethods } from './request-factory';

const RequestConfigList: IRequestConfigList = {
  login: {
    method: RequestMethods.POST,
    path: '/api/user/login'
  },
  getUsersList: {
    method: RequestMethods.GET,
    path: '/api/user/list'
  },
  addUser: {
    method: RequestMethods.POST,
    path: '/api/user/add'
  },
  editUser: {
    method: RequestMethods.POST,
    path: '/api/user/edit'
  },
  deleteUser: {
    method: RequestMethods.POST,
    path: '/api/user/delete'
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
  getMenuItem: {
    method: RequestMethods.GET,
    path: '/api/iiko/menuItem'
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
