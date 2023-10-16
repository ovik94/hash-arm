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
import StatementStore from './StatementStore';
import FeedbackStore from './FeedbackStore';
import PopupStore from './PopupStore';

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

  popupStore: PopupStore;

  notificationStore: NotificationsStore;

  checkListStore: CheckListStore;

  contractorsStore: ContractorsStore;

  instructionsStore: InstructionsStore;

  balanceStore: BalanceStore;

  banquetsStore: BanquetsStore;

  fortuneStore: FortuneStore;

  statementStore: StatementStore;

  feedbackStore: FeedbackStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.notificationStore = new NotificationsStore(this);
    this.checkListStore = new CheckListStore(this);
    this.contractorsStore = new ContractorsStore(this);
    this.instructionsStore = new InstructionsStore(this);
    this.balanceStore = new BalanceStore(this);
    this.banquetsStore = new BanquetsStore(this);
    this.fortuneStore = new FortuneStore(this);
    this.statementStore = new StatementStore(this);
    this.feedbackStore = new FeedbackStore(this);
    this.popupStore = new PopupStore(this);

    makeObservable(this, { isLoading: observable, setLoading: action });
  }

  setCreateRequest(createRequest: RequestFactory['createRequest']) {
    this.createRequest = createRequest;
  }

  public setLoading(value: boolean) {
    this.isLoading = value;
  }
}
