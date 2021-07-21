import { makeObservable, observable, action } from 'mobx';
import RequestFactory from '../core/request/request-factory';
import UserStore from './UserStore';
import CheckListStore from './CheckListStore';
import ContractorsStore from './ContractorsStore';

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

export class RootStore {
  createRequest: RequestFactory['createRequest'] = Promise.resolve;

  isLoading: boolean = false;

  userStore: UserStore;

  checkListStore: CheckListStore;

  contractorsStore: ContractorsStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.checkListStore = new CheckListStore(this);
    this.contractorsStore = new ContractorsStore(this);

    makeObservable(this, { isLoading: observable, setLoading: action });
  }

  setCreateRequest(createRequest: RequestFactory['createRequest']) {
    this.createRequest = createRequest;
  }

  public setLoading(value: boolean) {
    this.isLoading = value;
  }
}
