import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export enum OperationStatus {
  SUCCESS = 'SUCCESS',
  OPERATION_FAIL = 'OPERATION_FAIL',
  COUNTERPARTY_FAIL = 'COUNTERPARTY_FAIL'
}

export interface IProcessedOperation {
  status: OperationStatus;
  operation: {
    date: string;
    expense: number | string;
    incoming: number | string;
    name: string;
    purposeOfPayment: string;
  }
}

export default class StatementStore {
  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public processStatement = (formData: FormData) => {
    this.rootStore.setLoading(true);

    return this.rootStore
      .createRequest<Array<IProcessedOperation>>('processStatement', undefined, formData)
      .finally(() => {
        this.rootStore.setLoading(false);
      });
  };
}
