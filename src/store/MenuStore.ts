import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

export interface IMenuItem {
  title: string;
  price: number;
  weight: number;
}

export interface IMenu {
  potables: Array<IMenuItem>;
  salads: Array<IMenuItem>;
  snacks: Array<IMenuItem>;
  hotter: Array<IMenuItem>;
  sideDishes: Array<IMenuItem>;
  banquetMenu: Array<IMenuItem>;
}

export default class MenuStore {
  public menu: IMenu = {} as IMenu;

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setMenu = (data: IMenu) => {
    this.menu = data;
  };

  public fetchMenu = (): Promise<void> => {
    this.rootStore.setLoading(true);
    return this.rootStore.createRequest<IMenu>('getMenu')
      .then((data) => {
        this.setMenu(data);
        this.rootStore.setLoading(false);
      }).catch(() => this.rootStore.setLoading(false));
  };
}
