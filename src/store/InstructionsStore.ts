import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IInstructions {
  id: string;
  title: string;
  text: string;
  subtitle?: string;
}

export default class InstructionsStore {
  public instructions: Array<IInstructions> = [];

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setInstructions = (data: Array<IInstructions>) => {
    this.instructions = data;
  };

  public fetchInstructions = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IInstructions>>('getInstructions')
      .then((data) => {
        this.setInstructions(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };
}
