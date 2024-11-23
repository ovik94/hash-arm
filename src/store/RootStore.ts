import { makeObservable, observable, action } from "mobx";
import RequestFactory from "../core/request/request-factory";
import UserStore from "./UserStore";
import CounterpartiesStore from "./CounterpartiesStore";
import NotificationsStore from "./NotificationsStore";
import BalanceStore from "./BalanceStore";
import BanquetsStore from "./BanquetsStore";
import FortuneStore from "./FortuneStore";
import StatementStore from "./StatementStore";
import FeedbackStore from "./FeedbackStore";
import PopupStore from "./PopupStore";
import MenuStore from "./MenuStore";

export interface IAdmin {
  name: string;
}

interface IAdminListItem {
  name: string;
}

export type IAdminList = Array<IAdminListItem>;

export class RootStore {
  createRequest: RequestFactory["createRequest"] = Promise.resolve;

  isLoading: boolean = false;

  userStore: UserStore;

  popupStore: PopupStore;

  notificationStore: NotificationsStore;

  counterpartiesStore: CounterpartiesStore;

  balanceStore: BalanceStore;

  banquetsStore: BanquetsStore;

  fortuneStore: FortuneStore;

  statementStore: StatementStore;

  feedbackStore: FeedbackStore;

  menuStore: MenuStore;

  constructor() {
    this.userStore = new UserStore(this);
    this.notificationStore = new NotificationsStore(this);
    this.counterpartiesStore = new CounterpartiesStore(this);
    this.balanceStore = new BalanceStore(this);
    this.banquetsStore = new BanquetsStore(this);
    this.fortuneStore = new FortuneStore(this);
    this.statementStore = new StatementStore(this);
    this.feedbackStore = new FeedbackStore(this);
    this.menuStore = new MenuStore(this);

    this.popupStore = new PopupStore(this);

    makeObservable(this, { isLoading: observable, setLoading: action });
  }

  setCreateRequest(createRequest: RequestFactory["createRequest"]) {
    this.createRequest = createRequest;
  }

  public setLoading = (value: boolean) => {
    this.isLoading = value;
  };
}
