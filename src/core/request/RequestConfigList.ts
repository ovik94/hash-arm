import { IRequestConfigList, RequestMethods } from "./request-factory";

const RequestConfigList: IRequestConfigList = {
  login: {
    method: RequestMethods.POST,
    path: "/api/user/login",
  },
  getUsersList: {
    method: RequestMethods.GET,
    path: "/api/user/list",
  },
  addUser: {
    method: RequestMethods.POST,
    path: "/api/user/add",
  },
  editUser: {
    method: RequestMethods.POST,
    path: "/api/user/edit",
  },
  deleteUser: {
    method: RequestMethods.POST,
    path: "/api/user/delete",
  },
  getContractors: {
    method: RequestMethods.GET,
    path: "/api/contractors",
  },
  getPackagingList: {
    method: RequestMethods.GET,
    path: "/api/contractors/packaging",
  },
  getContractorInfo: {
    method: RequestMethods.GET,
    path: "/api/contractors/info",
  },
  postCreateOrder: {
    method: RequestMethods.POST,
    path: "/api/contractors/create",
  },
  getBarBalance: {
    method: RequestMethods.GET,
    path: "/api/iiko/bar-balance",
  },
  getBarNomenclature: {
    method: RequestMethods.GET,
    path: "/api/iiko/bar-nomenclature",
  },
  saveBarLimits: {
    method: RequestMethods.POST,
    path: "/api/iiko/save-bar-limits",
  },
  getBanquetMenu: {
    method: RequestMethods.GET,
    path: "/api/iiko/menu",
  },
  getBanquetMenuItem: {
    method: RequestMethods.GET,
    path: "/api/iiko/menuItem",
  },
  saveBanquet: {
    method: RequestMethods.POST,
    path: "/api/banquets/save",
  },
  editBanquet: {
    method: RequestMethods.POST,
    path: "/api/banquets/edit",
  },
  deleteBanquet: {
    method: RequestMethods.POST,
    path: "/api/banquets/delete",
  },
  getBanquetReserve: {
    method: RequestMethods.GET,
    path: "/api/banquets/reserve",
  },
  getBanquetReservesList: {
    method: RequestMethods.GET,
    path: "/api/banquets/reserves",
  },
  getWheelOfFortuneList: {
    method: RequestMethods.GET,
    path: "/api/wheel-of-fortune/list",
  },
  getWheelOfFortuneData: {
    method: RequestMethods.GET,
    path: "/api/wheel-of-fortune/data",
  },
  addWheelOfFortune: {
    method: RequestMethods.POST,
    path: "/api/wheel-of-fortune/add",
  },
  editWheelOfFortune: {
    method: RequestMethods.POST,
    path: "/api/wheel-of-fortune/edit",
  },
  deleteWheelOfFortune: {
    method: RequestMethods.POST,
    path: "/api/wheel-of-fortune/delete",
  },
  reduceItemCount: {
    method: RequestMethods.POST,
    path: "/api/fortune/reduce",
  },
  processStatement: {
    method: RequestMethods.POST,
    path: "/api/statement/process",
  },
  loadStatement: {
    method: RequestMethods.POST,
    path: "/api/statement/load",
  },
  getFeedbackList: {
    method: RequestMethods.GET,
    path: "/api/feedback/list",
  },
  updateFeedbackList: {
    method: RequestMethods.POST,
    path: "/api/feedback/update",
  },
  sendFeedback: {
    method: RequestMethods.POST,
    path: "/api/feedback/send",
  },
  getCounterparties: {
    method: RequestMethods.GET,
    path: "/api/v2/counterparties",
  },
  addCounterparty: {
    method: RequestMethods.POST,
    path: "/api/v2/counterparties/add",
  },
  editCounterparty: {
    method: RequestMethods.POST,
    path: "/api/v2/counterparties/edit",
  },
  deleteCounterparty: {
    method: RequestMethods.POST,
    path: "/api/v2/counterparties/delete",
  },
  getMenuList: {
    method: RequestMethods.GET,
    path: "/api/iiko-cloud/menu-list",
  },
  getMenu: {
    method: RequestMethods.POST,
    path: "/api/iiko-cloud/menu",
  },
};

export default RequestConfigList;
