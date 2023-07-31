import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IFortune {
  id: string;
  count: number;
  text: string;
  color: string;
}

export default class FortuneStore {
  public fortuneData: Array<IFortune> = [];

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setFortuneData = (data: Array<IFortune>) => {
    this.fortuneData = data;
  };

  public fetchFortuneData = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IFortune>>('getFortuneList')
      .then((data) => {
        this.setFortuneData(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };
}
