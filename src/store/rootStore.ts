export interface IAdmin {
  name: string;
}

interface ICheckListItem {
  title: string;
  description?: string;
  text?: string;
}

interface IAdminListItem {
  name: string;
}

export type ICkeckList = Array<ICheckListItem>;
export type IAdminList = Array<IAdminListItem>;

export function rootStore() {
  return {
    isAutorithed: false,
    isLoading: false,
    admin: {} as IAdmin,
    adminList: [] as IAdminList,
    checkList: [] as ICkeckList,

    setAutorithed(value: boolean) {
      this.isAutorithed = value;
    },

    setLoading(value: boolean) {
      this.isLoading = value;
    },

    setCheckList(data: ICkeckList) {
      this.checkList = data;
    },

    setAdmin(data: IAdmin) {
      this.admin = { ...this.admin, ...data };
    },

    setAdminList(adminList: IAdminList) {
      this.adminList = adminList;
    },

    fetchAdminList() {

    },

    fetchCheckList() {

    }
  };
}
