import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';
import { IContractor } from '../core/types';

export interface IContractorNomenclatures {
  id: string;
  title: string;
  unit?: string;
  price?: string;
  count?: string;
}

export default class ContractorsStore {
  public contractorNomenclatures: { [key: string]: Array<IContractorNomenclatures> } = {};

  public contractors: Array<IContractor> = [];

  public isLoadingOrder: boolean = false;

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setContractors = (data: Array<IContractor>) => {
    this.contractors = data;
  };

  public setLoadingOrder = (value: boolean) => {
    this.isLoadingOrder = value;
  };

  public setContractorNomenclatures = (id: string, data: Array<IContractorNomenclatures>) => {
    this.contractorNomenclatures[id] = data;
  };

  public fetchContractors = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IContractor>>('getContractors')
      .then((data) => {
        this.setContractors(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public fetchContractorInfo = (id: string): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IContractorNomenclatures>>('getContractorInfo', { id })
      .then((data) => {
        this.setContractorNomenclatures(id, data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public createOrder = (id: string, data: Array<IContractorNomenclatures>): Promise<void> => {
    this.setLoadingOrder(true);
    return this.rootStore.createRequest<Array<IContractorNomenclatures>>('postCreateOrder', { id }, { data })
      .then(() => {
        this.rootStore.notificationStore.addNotification({ code: 'CREATE_ORDER_SUCCESS', type: 'success' });
        this.setLoadingOrder(false);
      }).catch(() => this.setLoadingOrder(false));
  };
}
