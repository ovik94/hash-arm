import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';
import { ICounterpartyDetailForm } from '../components/counterparty-detail-form/CounterpartyDetailForm';

export enum CounterpartyTypes {
  kitchen = 'kitchen',
  service = 'service',
  manager = 'manager',
  provider = 'provider'
}

export interface ICounterparty {
  id: string;
  name: string;
  type: CounterpartyTypes,
  companyName?: string,
  phone?: string,
  description?: string
}

export default class CounterpartiesStore {
  public counterparties: Array<ICounterparty> | null = null;

  public isLoading: boolean = false;

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  private setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  public setCounterparties = (counterparties: Array<ICounterparty>) => {
    this.counterparties = counterparties;
  };

  public fetchCounterparties = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<ICounterparty>>('getCounterparties')
      .then((data) => {
        this.setCounterparties(data);
      })
      .finally(() => this.rootStore.setLoading(false));
  };

  public addCounterparty = (data: ICounterpartyDetailForm): Promise<void> => {
    this.rootStore.popupStore.setLoading(true);
    return this.rootStore.createRequest<Array<ICounterparty>>('addCounterparty', undefined, data)
      .then((counterparties) => {
        this.setCounterparties(counterparties);
      })
      .finally(() => this.rootStore.popupStore.setLoading(false));
  };

  public editUCounterparty = (data: ICounterparty): Promise<void> => {
    this.rootStore.popupStore.setLoading(true);
    return this.rootStore.createRequest<Array<ICounterparty>>('editCounterparty', undefined, data)
      .then((counterparties) => {
        this.setCounterparties(counterparties);
      })
      .finally(() => this.rootStore.popupStore.setLoading(false));
  };

  public deleteUCounterparty = (data: ICounterparty): Promise<void> => {
    this.rootStore.popupStore.setLoading(true);
    return this.rootStore.createRequest<Array<ICounterparty>>('deleteCounterparty', undefined, data)
      .then((counterparties) => {
        this.setCounterparties(counterparties);
      })
      .finally(() => this.rootStore.popupStore.setLoading(false));
  };
}
