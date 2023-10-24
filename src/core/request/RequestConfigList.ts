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
  getBarNomenclature: {
    method: RequestMethods.GET,
    path: '/api/iiko/bar-nomenclature'
  },
  saveBarLimits: {
    method: RequestMethods.POST,
    path: '/api/iiko/save-bar-limits'
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
  getWheelOfFortuneList: {
    method: RequestMethods.GET,
    path: '/api/wheel-of-fortune/list'
  },
  getWheelOfFortuneData: {
    method: RequestMethods.GET,
    path: '/api/wheel-of-fortune/data'
  },
  addWheelOfFortune: {
    method: RequestMethods.POST,
    path: '/api/wheel-of-fortune/add'
  },
  editWheelOfFortune: {
    method: RequestMethods.POST,
    path: '/api/wheel-of-fortune/edit'
  },
  deleteWheelOfFortune: {
    method: RequestMethods.POST,
    path: '/api/wheel-of-fortune/delete'
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
  updateFeedbackList: {
    method: RequestMethods.POST,
    path: '/api/feedback/update'
  },
  sendFeedback: {
    method: RequestMethods.POST,
    path: '/api/feedback/send'
  },
  getCounterparties: {
    method: RequestMethods.GET,
    path: '/api/v2/counterparties'
  },
  addCounterparty: {
    method: RequestMethods.POST,
    path: '/api/v2/counterparties/add'
  },
  editCounterparty: {
    method: RequestMethods.POST,
    path: '/api/v2/counterparties/edit'
  },
  deleteCounterparty: {
    method: RequestMethods.POST,
    path: '/api/v2/counterparties/delete'
  }
};

export default RequestConfigList;
