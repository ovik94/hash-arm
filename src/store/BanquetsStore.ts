import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';
import { IOrderData } from '../components/banquet-order/BanquetOrderMenu';

export interface IMenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
}

export interface IMenuGroup {
  id: string;
  name: string;
  items: Array<IMenuItem>;
}

export interface IBanquetsMenu {
  menu: Array<IMenuGroup>
  options: IOptions;
}

export interface IBanquetsMenuItem {
  name: string;
  description: string;
  price: number;
  portionWeightGrams: number;
}

export interface IOptions {
  pricePerPerson: number;
  weightPerPerson: { [type: string]: number }
}

export interface IBanquetReserve {
  id?: string;
  name: string;
  phone: string;
  personsCount: number;
  date: Date;
  menu: Array<IOrderData>;
  sum: number;
  totalAmount: number;
  sale?: string;
  serviceFee?: boolean;
  admin: string;
  comment?: string;
}

export default class BanquetsStore {
  public menu: Array<IMenuGroup> = [];

  public reserves: Array<IBanquetReserve> | null = null;

  public options: IOptions = {} as IOptions;

  public isLoading: boolean = false;

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setLoading(value: boolean) {
    this.isLoading = value;
  }

  public setMenu = (data: Array<IMenuGroup>) => {
    this.menu = data;
  };

  public setOptions = (options: IOptions) => {
    this.options = options;
  };

  public setReserves = (reserves: Array<IBanquetReserve>) => {
    this.reserves = reserves;
  };

  public fetchMenu = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<IBanquetsMenu>('getMenu')
      .then((data) => {
        this.setMenu(data.menu);
        this.setOptions(data.options);
      })
      .finally(() => this.rootStore.setLoading(false));
  };

  public getReserve = (id: string): Promise<IBanquetReserve> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<IBanquetReserve>('getBanquetReserve', { id })
      .then(data => data)
      .finally(() => this.rootStore.setLoading(false));
  };

  public getReservesList = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IBanquetReserve>>('getBanquetReservesList')
      .then((data) => {
        this.setReserves(data);
      })
      .finally(() => this.rootStore.setLoading(false));
  };

  public fetchMenuItem = (id: string): Promise<IBanquetsMenuItem> => {
    this.setLoading(true);
    return this.rootStore.createRequest<IBanquetsMenuItem>('getMenuItem', { id })
      .then(data => data)
      .finally(() => this.setLoading(false));
  };

  public save = (data: IBanquetReserve): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IBanquetReserve>>('saveBanquet', {}, data)
      .then((reserves) => {
        this.setReserves(reserves);
        this.rootStore.notificationStore.addNotification({ code: 'SAVE_BANQUET_SUCCESS', type: 'success' });
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public edit = (data: IBanquetReserve): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IBanquetReserve>>('editBanquet', {}, data)
      .then((reserves) => {
        this.setReserves(reserves);
        this.rootStore.notificationStore.addNotification({ code: 'EDIT_BANQUET_SUCCESS', type: 'success' });
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public delete = (data: IBanquetReserve): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IBanquetReserve>>('deleteBanquet', {}, data)
      .then((reserves) => {
        this.setReserves(reserves);
        this.rootStore.notificationStore.addNotification({ code: 'DELETE_BANQUET_SUCCESS', type: 'success' });
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };
}
