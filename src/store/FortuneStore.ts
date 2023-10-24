import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IWheelOfFortuneContent {
  id?: string;
  title: string;
  color: string;
}

export interface IWheelOfFortuneData {
  id?: string;
  code: string;
  description: string;
  content: Array<IWheelOfFortuneContent>;
}

export type FortuneCode = 'birthdayFortune' | 'feedbackFortune';

export default class FortuneStore {
  public wheelOfFortuneList: Array<IWheelOfFortuneData> | null = null;

  public wheelOfFortuneData: { [type: string]: Array<IWheelOfFortuneContent> } = {};

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setWheelOfFortuneData = (code: FortuneCode, data: Array<IWheelOfFortuneContent>) => {
    this.wheelOfFortuneData = { ...this.wheelOfFortuneData, [code]: data };
  };

  public setWheelOfFortuneList = (data: Array<IWheelOfFortuneData>) => {
    this.wheelOfFortuneList = data;
  };

  public fetchFortuneData = (code: FortuneCode): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<IWheelOfFortuneData>('getWheelOfFortuneData', { code })
      .then((data) => {
        this.setWheelOfFortuneData(code, data.content);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public fetchWheelOfFortuneList = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<Array<IWheelOfFortuneData>>('getWheelOfFortuneList')
      .then((data) => {
        this.setWheelOfFortuneList(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };

  public addWheelOfFortune = (body: IWheelOfFortuneData): Promise<void> => {
    this.rootStore.popupStore.setLoading(true);
    return this.rootStore.createRequest<Array<IWheelOfFortuneData>>('addWheelOfFortune', undefined, body)
      .then((data) => {
        this.setWheelOfFortuneList(data);
        this.rootStore.popupStore.setLoading(false);
      }).catch(() => this.rootStore.popupStore.setLoading(false));
  };

  public editWheelOfFortune = (body: IWheelOfFortuneData): Promise<void> => {
    this.rootStore.popupStore.setLoading(true);
    return this.rootStore.createRequest<Array<IWheelOfFortuneData>>('editWheelOfFortune', undefined, body)
      .then((data) => {
        this.setWheelOfFortuneList(data);
        this.rootStore.popupStore.setLoading(false);
      }).catch(() => this.rootStore.popupStore.setLoading(false));
  };

  public deleteWheelOfFortune = (id: string): Promise<void> => {
    this.rootStore.popupStore.setLoading(true);
    return this.rootStore.createRequest<Array<IWheelOfFortuneData>>('deleteWheelOfFortune', undefined, { id })
      .then((data) => {
        this.setWheelOfFortuneList(data);
        this.rootStore.popupStore.setLoading(false);
      }).catch(() => this.rootStore.popupStore.setLoading(false));
  };
}
