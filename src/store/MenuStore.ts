import { makeAutoObservable } from "mobx";
// eslint-disable-next-line import/no-cycle
import { RootStore } from "./RootStore";

export interface IMenuListItem {
  id: string;
  name: string;
}

export interface IMenuGroup {
  id: string;
  name: string;
  items: Array<IMenuGroupItem>;
}

export interface IMenuGroupItem {
  description: string;
  name: string;
  price: number;
  size: { weight: number; sizeName: string };
  image?: string;
}

export interface ILunchWeek {
  weekNumber: number;
  isHoliday: boolean;
}

export default class MenuStore {
  public menuList: Array<IMenuListItem> | null = null;
  public menu: Record<string, Array<IMenuGroup>> = {};
  public lunchWeek: ILunchWeek | null = null;
  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  public setMenuList = (menuList: Array<IMenuListItem>) => {
    this.menuList = menuList;
  };

  public setMenu = (menu: Array<IMenuGroup>, id: string) => {
    this.menu = { ...this.menu, [id]: menu };
  };

  public setLunchWeek = (lunchWeek: ILunchWeek) => {
    this.lunchWeek = lunchWeek;
  };

  public fetchMenuList = async () => {
    this.rootStore.setLoading(true);

    return this.rootStore
      .createRequest<Array<IMenuListItem>>("getMenuList")
      .then((data) => {
        this.setMenuList(data);
      })
      .finally(() => {
        this.rootStore.setLoading(false);
      });
  };

  public fetchMenu = async (id: string) => {
    this.rootStore.setLoading(true);

    return this.rootStore
      .createRequest<Array<IMenuGroup>>("getMenu", undefined, { id })
      .then((data) => {
        this.setMenu(data, id);
      })
      .finally(() => {
        this.rootStore.setLoading(false);
      });
  };

  public getLunchWeek = async () => {
    this.rootStore.setLoading(true);
    return this.rootStore
      .createRequest<ILunchWeek>("getLunchWeek")
      .then((week) => {
        this.setLunchWeek(week);
      })
      .finally(() => {
        this.rootStore.setLoading(false);
      });
  };
}
