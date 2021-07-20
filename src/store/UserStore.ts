import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './rootStore';

export interface IUser {
  id: string;
  name: string;
  phone: string;
}

export default class UserStore {
  public user: IUser = {} as IUser;

  public usersList: Array<IUser> = [];

  public isAutorithed: boolean = false;

  public isLoading: boolean = false;

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  private setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  public setAutorithed = (value: boolean) => {
    this.isAutorithed = value;
  };

  public setUser = (user: IUser) => {
    this.user = user;
  };

  public setUsersList = (usersList: Array<IUser>) => {
    this.usersList = usersList;
  };

  public fetchUsersList = (): Promise<void> => {
    this.setLoading(true);
    return this.rootStore.createRequest<Array<IUser>>('getUsersList')
      .then(({ data }) => {
        this.setUsersList(data);
        this.setLoading(false);
      }).catch(() => this.setLoading(false));
  };
}
