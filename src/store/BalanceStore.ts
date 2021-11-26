import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IBalance {
  name: string;
  category: string;
  unit: string;
  balance: number;
}

export default class ContractorsStore {
  public barBalance: Array<IBalance> = [];

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setBarBalance = (data: Array<IBalance>) => {
    this.barBalance = data.filter(item => item.balance !== undefined).sort((a, b) => a.balance - b.balance);
  };

  public fetchBarBalance = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IBalance>>('getBarBalance', { doNotSendInTelegram: 'true' })
      .then((data) => {
        this.setBarBalance(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };
}
