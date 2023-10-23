import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IBarBalance {
  id: string;
  name: string;
  category: string;
  balance: number;
}

export interface IBarNomenclature {
  id: string;
  name: string;
  category: string;
  limit: number;
}

export interface IBarLimit {
  id: string;
  limit?: number;
}

export default class BalanceStore {
  public barBalance: Array<IBarBalance> = [];

  public barNomenclature: Array<IBarNomenclature> = [];

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setBarBalance = (data: Array<IBarBalance>) => {
    this.barBalance = data.filter(item => item.balance !== undefined).sort((a, b) => a.balance - b.balance);
  };

  public setBarNomenclature = (data: Array<IBarNomenclature>) => {
    this.barNomenclature = data.sort((a, b) => a.name.localeCompare(b.name));
  };

  public fetchBarNomenclature = (): Promise<void> => this.rootStore
    .createRequest<Array<IBarNomenclature>>('getBarNomenclature')
    .then((data) => {
      this.setBarNomenclature(data);
    })
  ;

  public fetchBarBalance = (): Promise<void> => this.rootStore
    .createRequest<Array<IBarBalance>>('getBarBalance', { doNotSendInTelegram: 'true' })
    .then((data) => {
      this.setBarBalance(data);
    });

  public saveBarLimits = (limits: Array<IBarLimit>): Promise<void> => {
    this.rootStore.setLoading(true);

    return this.rootStore
      .createRequest<Array<IBarNomenclature>>('saveBarLimits', undefined, { limits })
      .then(() => {
        this.rootStore.setLoading(false);
      });
  };
}
