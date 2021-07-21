import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IPackagingList {
  id: string;
  title: string;
  unit: string;
  price: string;
}

export default class CheckListStore {
  public packagingList: Array<IPackagingList> = [];

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setPackagingList = (data: Array<IPackagingList>) => {
    this.packagingList = data;
  };

  public fetchPackagingList = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IPackagingList>>('getPackagingList')
      .then(({ data }) => {
        this.setPackagingList(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };
}
