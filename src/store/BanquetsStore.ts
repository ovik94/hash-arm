import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';
import { IOrderData, IOrderDataItem } from '../components/banquet-order/BanquetOrder';

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
  public menu: Array<IMenuGroup> = [];

  public options: IOptions = {} as IOptions;

  public orderData: Array<IOrderData> = [];

  public orderSum: number = 0;

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

  public fetchMenu = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<IBanquetsMenu>('getMenu')
      .then((data) => {
        this.setMenu(data.menu);
        this.setOptions(data.options);
      })
      .finally(() => this.rootStore.setLoading(false));
  };

  public fetchMenuItem = (id: string): Promise<IBanquetsMenuItem> => {
    this.setLoading(true);
    return this.rootStore.createRequest<IBanquetsMenuItem>('getMenuItem', { id })
      .then(data => data)
      .finally(() => this.setLoading(false));
  };

  public save = (data: ISaveBanquetBody): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest('postBanquetSave', {}, data)
      .then(() => {
        this.rootStore.notificationStore.addNotification({ code: 'SAVE_BANQUET_SUCCESS', type: 'success' });
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public addItemOrderData = (id: string, name: string, option: IOrderDataItem) => {
    const currentData = this.orderData.find(orderItem => orderItem.id === id);
    let newOrderData;

    if (currentData) {
      const newItems = currentData.items.slice(0);
      newItems.push(option);
      newOrderData = this.orderData.map(orderItem => (orderItem.id === id ? ({
        ...orderItem,
        items: newItems
      }) : orderItem));
    } else {
      const copyOrderData = this.orderData.slice(0);
      copyOrderData.push({ id, name, items: [option] });

      newOrderData = copyOrderData;
    }

    this.addOrderSum(option.price);

    this.orderData = newOrderData;
  };

  public editCountOrderData = (groupId: string, id: string, newCount: number) => {
    this.orderData = this.orderData.map(orderGroup => (orderGroup.id === groupId ? ({
      ...orderGroup,
      items: orderGroup.items.map(orderItem => (orderItem.id === id ? ({ ...orderItem, count: newCount }) : orderItem))
    }) : orderGroup));
  };

  public deleteItemOrderData = (groupId: string, id: string) => {
    this.orderData = this.orderData.map(orderGroup => (orderGroup.id === groupId ? ({
      ...orderGroup,
      items: orderGroup.items.filter(orderItem => orderItem.id !== id)
    }) : orderGroup)).filter(item => item.items.length > 0);
  };

  public addOrderSum = (amount: number) => {
    this.orderSum += amount;
  };

  public subtractOrderSum = (amount: number) => {
    this.orderSum -= amount;
  };
}
