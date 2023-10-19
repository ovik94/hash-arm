import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';
import { IResponse } from '../core/request/request-factory';

export type IFeedbackType =
  'textInput'
  | 'textArea'
  | 'select'
  | 'rating'
  | 'selectOtherVariant'
  | 'selectGroupString'
  | 'selectGroupNumber';

export interface IFeedbackItem {
  id?: string;
  title: string;
  type: IFeedbackType;
  required?: boolean;
  subtitle?: string;
  options?: Array<string>;
  response?: string | Array<string> | number;
}

export default class FeedbackStore {
  public feedbackList: Array<IFeedbackItem> | null = null;

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setFeedbackList = (data: Array<IFeedbackItem>) => {
    this.feedbackList = data;
  };

  public setResponse = (id: string, value: string | Array<string> | number) => {
    this.feedbackList = (this.feedbackList || []).map(item => (item.id === id ? ({ ...item, response: value }) : item));
  };

  public fetchFeedbackList = (): Promise<Array<IFeedbackItem>> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IFeedbackItem>>('getFeedbackList')
      .then((data) => {
        this.setFeedbackList(data);
        return data;
      }).finally(() => this.rootStore.setLoading(false));
  };

  public updateFeedbackList = (requests: Array<IFeedbackItem>): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IFeedbackItem>>('updateFeedbackList', undefined, { requests })
      .then((data) => {
        this.setFeedbackList(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public sendFeedback = (): Promise<IResponse<any>> => {
    this.rootStore.setLoading(true);
    // @ts-ignore
    return this.rootStore.createRequest('sendFeedback', undefined, this.feedbackList || [])
      .then((response) => {
        this.rootStore.setLoading(false);
        return response;
      }).catch(() => this.rootStore.setLoading(false));
  };
}
