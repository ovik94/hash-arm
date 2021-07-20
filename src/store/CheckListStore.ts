import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface ICheckList {
  title: string;
  items: Array<string>;
}

export default class CheckListStore {
  public checkList: Array<ICheckList> = [];

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setCheckList = (checkList: Array<ICheckList>) => {
    this.checkList = checkList;
  };

  public fetchCheckList = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<ICheckList>>('getCheckList')
      .then(({ data }) => {
        this.setCheckList(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };
}
