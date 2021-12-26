import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IMenuItem {
  title: string;
  price: number;
  weight: number;
}

export interface IBanquetsMenu {
  menu: IMenu
  options: IOptions;
}

export interface IMenu {
  potables: Array<IMenuItem>;
  salads: Array<IMenuItem>;
  snacks: Array<IMenuItem>;
  hotter: Array<IMenuItem>;
  sideDishes: Array<IMenuItem>;
  banquetMenu: Array<IMenuItem>;
}

export interface IOptions {
  pricePerPerson: number;
  weightPerPerson: { [type: string]: number }
}

export interface ISaveBanquetBody {
  name: string;
  phone: string;
  personsCount: number;
  date: Date;
  menu: {
    [type: string]: Array<{
      title: string;
      price: number;
      weight: number;
      count?: number;
    }>
  },
  sum: number;
  totalAmount: number;
  sale?: string;
  serviceFee?: string;
  admin: string;
}

export default class BanquetsStore {
  public menu: IMenu = {} as IMenu;

  public options: IOptions = {} as IOptions;

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setMenu = (data: IMenu) => {
    this.menu = data;
  };

  public setOptions = (options: IOptions) => {
    this.options = options;
  };

  public fetchMenu = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<IBanquetsMenu>('getMenu')
      .then((data) => {
        this.setMenu(data.menu);
        this.setOptions(data.options);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public save = (data: ISaveBanquetBody): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest('postBanquetSave', {}, data)
      .then(() => {
        this.rootStore.notificationStore.addNotification({ code: 'SAVE_BANQUET_SUCCESS', type: 'success' });
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };
}
