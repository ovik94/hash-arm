import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';

interface MenuItem {
  title: string;
  price: number;
  weight: number;
}

export interface IMenu {
  potables: Array<MenuItem>;
  salads: Array<MenuItem>;
  snacks: Array<MenuItem>;
  hotter: Array<MenuItem>;
  sideDishes: Array<MenuItem>;
  banquetMenu: Array<MenuItem>;
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
