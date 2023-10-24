import { makeAutoObservable } from 'mobx';
// eslint-disable-next-line import/no-cycle
import { RootStore } from './RootStore';
import { IUserDetailForm } from '../components/user-detail-form/UserDetailForm';

export enum PrivilegeType {
  EDIT_USER = 'EDIT_USER',
  EDIT_SUPERVISOR = 'EDIT_SUPERVISOR',
  EDIT_FEEDBACK_REQUESTS = 'EDIT_FEEDBACK_REQUESTS',
  EDIT_FORTUNE_DATA = 'EDIT_FORTUNE_DATA',
  UPLOAD_STATEMENT = 'UPLOAD_STATEMENT'
}

export interface IUser {
  id: string;
  name: string;
  phone: string;
  role: 'admin' | 'waiter' | 'supervisor',
  privilege: Array<PrivilegeType>
}

export default class UserStore {
  public user: IUser = {} as IUser;

  public usersList: Array<IUser> | null = null;

  public isAuthorized: boolean = false;

  public isLoading: boolean = false;

  protected rootStore: RootStore;

  constructor(rootStore: RootStore) {
    this.rootStore = rootStore;
    makeAutoObservable(this);
  }

  private setLoading = (value: boolean) => {
    this.isLoading = value;
  };

  public setAuthorized = (value: boolean) => {
    this.isAuthorized = value;
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
      .then((data) => {
        this.setUsersList(data);
        this.setLoading(false);
      }).catch(() => this.setLoading(false));
  };

  public login = (data: { id: string; password: string; }): Promise<void> => {
    this.setLoading(true);
    return this.rootStore.createRequest('login', undefined, data)
      .then(() => {
        const user = this.usersList?.find(item => item.id === data.id);

        if (user) {
          this.setUser(user);
          this.setAuthorized(true);
          sessionStorage.setItem('adminName', JSON.stringify(user));
        }

        this.setLoading(false);
      }).catch(() => this.setLoading(false));
  };

  public addUser = (data: IUserDetailForm): Promise<void> => {
    this.rootStore.popupStore.setLoading(true);
    return this.rootStore.createRequest<Array<IUser>>('addUser', undefined, data)
      .then((users) => {
        this.setUsersList(users);
      })
      .finally(() => this.rootStore.popupStore.setLoading(false));
  };

  public editUser = (data: IUserDetailForm & { id: string; }): Promise<void> => {
    this.rootStore.popupStore.setLoading(true);
    return this.rootStore.createRequest<Array<IUser>>('editUser', undefined, data)
      .then((users) => {
        this.setUsersList(users);
      })
      .finally(() => this.rootStore.popupStore.setLoading(false));
  };

  public deleteUser = (data: IUser): Promise<void> => {
    this.rootStore.popupStore.setLoading(true);
    return this.rootStore.createRequest<Array<IUser>>('deleteUser', undefined, data)
      .then((users) => {
        this.setUsersList(users);
      })
      .finally(() => this.rootStore.popupStore.setLoading(false));
  };
}
