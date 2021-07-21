import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface ICheckList {
  title: string;
  items: Array<string>;
}

export default class CheckListStore {
  public checkList: Array<ICheckList> = [];

  public activeSteps: { [key: string]: number } = {};

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setCheckList = (checkList: Array<ICheckList>) => {
    this.checkList = checkList;
  };

  public addStep = (id: string) => {
    this.activeSteps = { ...this.activeSteps, [id]: (this.activeSteps[id] || 0) + 1 };
  };

  public takeAwayStep = (id: string) => {
    this.activeSteps = { ...this.activeSteps, [id]: (this.activeSteps[id] || 0) - 1 };
  };

  public resetStep = () => {
    this.activeSteps = {};
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
