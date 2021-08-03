import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IContractorNomenclatures {
  id: string;
  title: string;
  unit: string;
  price: string;
}

export interface Contractor {
  id: string;
  title: string;
  phone: string;
  manager: string;
}

export default class CheckListStore {
  public contractorNomenclatures: { [key: string]: Array<IContractorNomenclatures> } = {};

  public contractors: Array<Contractor> = [];

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setContractors = (data: Array<Contractor>) => {
    this.contractors = data;
  };

  public setContractorNomenclatures = (id: string, data: Array<IContractorNomenclatures>) => {
    this.contractorNomenclatures[id] = data;
  };

  public fetchContractors = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<Contractor>>('getContractors')
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
