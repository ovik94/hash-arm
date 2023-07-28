import { makeObservable, observable, action } from 'mobx';
import RequestFactory from '../core/request/request-factory';
import UserStore from './UserStore';
import CheckListStore from './CheckListStore';
import ContractorsStore from './ContractorsStore';
import NotificationsStore from './NotificationsStore';
import InstructionsStore from './InstructionsStore';
import BalanceStore from './BalanceStore';
import BanquetsStore from './BanquetsStore';
import FortuneStore from './FortuneStore';

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

export type ICheckList = Array<ICheckListItem>;
export type IAdminList = Array<IAdminListItem>;

export class RootStore {
  createRequest: RequestFactory['createRequest'] = Promise.resolve;

  isLoading: boolean = false;

  userStore: UserStore;

  notificationStore: NotificationsStore;

  checkListStore: CheckListStore;

  contractorsStore: ContractorsStore;

  instructionsStore: InstructionsStore;

  balanceStore: BalanceStore;

  banquetsStore: BanquetsStore;

  fortuneStore: FortuneStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.notificationStore = new NotificationsStore(this);
    this.checkListStore = new CheckListStore(this);
    this.contractorsStore = new ContractorsStore(this);
    this.instructionsStore = new InstructionsStore(this);
    this.balanceStore = new BalanceStore(this);
    this.banquetsStore = new BanquetsStore(this);
    this.fortuneStore = new FortuneStore(this);

    makeObservable(this, { isLoading: observable, setLoading: action });
  }

  setCreateRequest(createRequest: RequestFactory['createRequest']) {
    this.createRequest = createRequest;
  }

  public setLoading(value: boolean) {
    this.isLoading = value;
  }
}
