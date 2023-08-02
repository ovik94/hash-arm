import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IFortune {
  id: string;
  count: number;
  text: string;
  color: string;
}

export type FortuneType = 'birthdayFortune';

export default class FortuneStore {
  public fortuneData: { [type: string]: Array<IFortune> } = {};

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setFortuneData = (type: FortuneType, data: Array<IFortune>) => {
    this.fortuneData = { ...this.fortuneData, [type]: data.filter(prize => Boolean(prize.count)) };
  };

  public fetchFortuneData = (type: FortuneType): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IFortune>>('getFortuneList', { type })
      .then((data) => {
        this.setFortuneData(type, data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public reduceItemCount = (type: FortuneType, id: string): Promise<void> => this.rootStore
    .createRequest<void>('reduceItemCount', undefined, { type, id })
    .finally(() => {});
}
