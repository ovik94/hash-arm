import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';
import { IOrderData, IOrderDataItem } from '../components/banquet-order/BanquetOrder';
import { IClientDataForm } from '../components/client-data-form/ClientDataForm';

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
  menu: Array<IOrderData>;
  sum: number;
  totalAmount: number;
  sale?: string;
  serviceFee?: string;
  admin: string;
}

export default class BanquetsStore {
  public menu: Array<IMenuGroup> = [];

  public options: IOptions = {} as IOptions;

  public clientData: IClientDataForm | null = null;

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

  public setClientData = (data: IClientDataForm | null) => {
    this.clientData = data;
  };

  public setOrderData = (data: Array<IOrderData>) => {
    this.orderData = data;
  };

  public setOrderSum = (sum: number) => {
    this.orderSum = sum;
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

    this.setOrderData(newOrderData);
  };

  public editCountOrderData = (groupId: string, id: string, newCount: number) => {
    const newOrderData = this.orderData.map(orderGroup => (orderGroup.id === groupId ? ({
      ...orderGroup,
      items: orderGroup.items.map(orderItem => (orderItem.id === id ? ({ ...orderItem, count: newCount }) : orderItem))
    }) : orderGroup));

    this.setOrderData(newOrderData);
  };

  public deleteItemOrderData = (groupId: string, id: string) => {
    const newOrderData = this.orderData.map(orderGroup => (orderGroup.id === groupId ? ({
      ...orderGroup,
      items: orderGroup.items.filter(orderItem => orderItem.id !== id)
    }) : orderGroup)).filter(item => item.items.length > 0);

    this.setOrderData(newOrderData);
  };

  public addOrderSum = (amount: number) => {
    this.setOrderSum(this.orderSum + amount);
  };

  public subtractOrderSum = (amount: number) => {
    this.setOrderSum(this.orderSum - amount);
  };
}
