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

export default class CheckListStore {
  public contractorNomenclatures: { [key: string]: Array<IContractorNomenclatures> } = {};

  public contractors: Array<IContractor> = [];

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setContractors = (data: Array<IContractor>) => {
    this.contractors = data;
  };

  public setContractorNomenclatures = (id: string, data: Array<IContractorNomenclatures>) => {
    this.contractorNomenclatures[id] = data;
  };

  public setCount = (id: string, count: string) => {
    this.contractorNomenclatures[id] = this.contractorNomenclatures[id]
      .map(nomenclature => ({ ...nomenclature, count }));
  };

  public fetchContractors = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IContractor>>('getContractors')
      .then(({ data }) => {
        this.setContractors(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public fetchContractorInfo = (id: string): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IContractorNomenclatures>>('getContractorInfo', { id })
      .then(({ data }) => {
        this.setContractorNomenclatures(id, data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };
}
